#!/usr/bin/env python3
"""
Strip visual properties from tabulator.min.css that conflict with a transparent glass theme.
Replaces background-color/background with transparent, removes transforms and box-shadows.
"""
import re

with open("tabulator.min.css") as f:
    css = f.read()

# 1. Remove translateZ(0) transforms that create stacking contexts and break backdrop-filter
css = re.sub(r'-webkit-transform:translateZ\(0\);?', '', css)
css = re.sub(r'-moz-transform:translateZ\(0\);?', '', css)
css = re.sub(r'-ms-transform:translateZ\(0\);?', '', css)
css = re.sub(r'transform:translateZ\(0\);?', '', css)

# 2. Replace all opaque background-color values with transparent
#    Match: background-color:#hex, background-color:rgb(...), background-color:rgba(non-transparent)
css = re.sub(r'background-color:#[0-9a-fA-F]{3,6}', 'background-color:transparent', css)
css = re.sub(r'background-color:rgb\([^)]+\)', 'background-color:transparent', css)
# Keep background-color:transparent and background-color:inherit as-is

# 3. Replace all opaque background shorthand values with transparent
#    Match: background:#hex, background:rgb(...), background:rgba(0,0,0,.4) etc
css = re.sub(r'background:#[0-9a-fA-F]{3,6}(?![0-9a-fA-F])', 'background:transparent', css)
css = re.sub(r'background:rgb\([^)]+\)', 'background:transparent', css)
css = re.sub(r'background:rgba\([^)]+\)', 'background:transparent', css)
css = re.sub(r'background:hsla?\([^)]+\)', 'background:transparent', css)
# Keep background:transparent as-is

# 4. Remove box-shadow declarations (they add visual weight)
css = re.sub(r'box-shadow:[^;}]+', 'box-shadow:none', css)

# 5. Make all borders transparent (keep the sizing for layout)
css = re.sub(r'border:1px solid #[0-9a-fA-F]{3,6}', 'border:1px solid transparent', css)
css = re.sub(r'border-color:#[0-9a-fA-F]{3,6}', 'border-color:transparent', css)
css = re.sub(r'border-top:1px solid #[0-9a-fA-F]{3,6}', 'border-top:1px solid transparent', css)
css = re.sub(r'border-bottom:1px solid #[0-9a-fA-F]{3,6}', 'border-bottom:1px solid transparent', css)
css = re.sub(r'border-left:1px solid #[0-9a-fA-F]{3,6}', 'border-left:1px solid transparent', css)
css = re.sub(r'border-right:1px solid #[0-9a-fA-F]{3,6}', 'border-right:1px solid transparent', css)

# 6. Replace text colors with inherit so our theme controls them
css = re.sub(r'(?<!background-)color:#[0-9a-fA-F]{3,6}', 'color:inherit', css)

with open("tabulator.min.css", "w") as f:
    f.write(css)

print("Done. Visual properties stripped from tabulator.min.css")
