import sys
from PIL import Image

def what(file, h=None):
    """
    Polyfill for the removed imghdr standard library module in Python 3.13+.
    Uses Pillow (already in requirements.txt) to identify image formats.
    """
    try:
        if isinstance(file, (str, bytes)):
            with Image.open(file) as img:
                fmt = img.format.lower()
                # normalize jpeg to jpg to match original imghdr behaviour if needed, 
                # though most libraries accept either.
                return 'jpeg' if fmt == 'jpg' else fmt
        else:
            pos = file.tell()
            with Image.open(file) as img:
                fmt = img.format.lower()
            file.seek(pos)
            return 'jpeg' if fmt == 'jpg' else fmt
    except Exception:
        return None
