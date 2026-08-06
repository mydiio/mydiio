from pathlib import Path
from PIL import Image

ROOT = Path("src/assets/journey-composition")
OUTPUT_DIR = Path("diagnostics/journey-composition/composites")

CANVAS_SIZE = (2560, 1440)

LAYERS = [
    ("sky", ROOT / "sky_master.png", 1.00),
    ("horizon-glow", ROOT / "horizon_glow.png", 1.00),
    ("skyline", ROOT / "skyline.png", 1.00),
    ("left-architecture", ROOT / "left_architecture.png", 1.00),
    ("right-architecture", ROOT / "right_architecture.png", 1.00),
    ("road", ROOT / "road.png", 1.00),
    ("curbs", ROOT / "curbs.png", 1.00),
    ("streetlights", ROOT / "streetlights.png", 1.00),
    ("palms", ROOT / "palms.png", 1.00),
    ("foreground-details", ROOT / "foreground_details.png", 1.00),
    ("atmosphere", ROOT / "atmosphere.png", 1.00),
]


def load_layer(path: Path) -> Image.Image:
    if not path.exists():
        raise FileNotFoundError(f"Missing layer: {path}")

    image = Image.open(path).convert("RGBA")

    if image.size != CANVAS_SIZE:
        raise ValueError(
            f"{path.name} is {image.size[0]}×{image.size[1]}, "
            f"expected {CANVAS_SIZE[0]}×{CANVAS_SIZE[1]}"
        )

    return image


def apply_opacity(image: Image.Image, opacity: float) -> Image.Image:
    if opacity >= 1:
        return image

    adjusted = image.copy()
    alpha = adjusted.getchannel("A")
    alpha = alpha.point(lambda value: round(value * opacity))
    adjusted.putalpha(alpha)

    return adjusted


def save_checkpoint(
    composite: Image.Image,
    index: int,
    layer_name: str,
) -> None:
    checkpoint = OUTPUT_DIR / f"{index:02d}-{layer_name}.png"
    composite.save(checkpoint, optimize=True)
    print(f"Checkpoint: {checkpoint}")


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    base = load_layer(ROOT / "sky_master.png")

    # Ensure the master output remains fully opaque.
    composite = Image.new("RGBA", CANVAS_SIZE, (8, 8, 7, 255))
    composite.alpha_composite(base)

    save_checkpoint(composite, 1, "sky")

    for index, (name, path, opacity) in enumerate(LAYERS[1:], start=2):
        layer = apply_opacity(load_layer(path), opacity)
        composite.alpha_composite(layer)
        save_checkpoint(composite, index, name)

    png_output = OUTPUT_DIR / "journey-composite-full.png"
    jpg_output = OUTPUT_DIR / "journey-composite-full.jpg"

    composite.save(png_output, optimize=True)

    composite.convert("RGB").save(
        jpg_output,
        quality=94,
        optimize=True,
    )

    print("")
    print("Created final composite:")
    print(png_output)
    print(jpg_output)


if __name__ == "__main__":
    main()
