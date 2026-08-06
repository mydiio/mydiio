from pathlib import Path
from PIL import Image

SOURCE = Path("src/assets/journey-screen-ui")
OUTPUT = SOURCE / "cropped"

OUTPUT.mkdir(exist_ok=True)

#
# These numbers define the visible UI region.
#
# We'll calibrate them once.
#

LEFT = 420
TOP = 236
RIGHT = 2140
BOTTOM = 1204

for path in sorted(SOURCE.glob("screen_*.png")):

    image = Image.open(path).convert("RGBA")

    cropped = image.crop(
        (
            LEFT,
            TOP,
            RIGHT,
            BOTTOM,
        )
    )

    output = OUTPUT / path.name.replace(
        ".png",
        "_crop.png",
    )

    cropped.save(output)

    print(output)

print()
print("Done.")
python3 scripts/screenCrop/cropScreens.py
python3 <<'PY'
from pathlib import Path
from PIL import Image

print()

for path in sorted(
    Path(
        "src/assets/journey-screen-ui/cropped"
    ).glob("*.png")
):

    img = Image.open(path)

    print(
        path.name,
        img.size,
    )
PY
