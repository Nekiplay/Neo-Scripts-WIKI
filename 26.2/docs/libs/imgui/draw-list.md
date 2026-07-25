---
description: ImGui draw list - custom rendering
icon: pencil
---

# Draw List

The `imgui.dl` table provides functions for custom drawing inside ImGui windows using the background draw list.

```lua
local dl = imgui.dl
```

All color values are 0–255 (RGBA). Coordinates are in pixels.

---

## Lines

### `renderLine(x1, y1, x2, y2, red, green, blue, alpha, thickness)`

Draw a line.

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| x1, y1 | number | 0 | Start position |
| x2, y2 | number | 0 | End position |
| red, green, blue, alpha | number | 255 | Color (0–255) |
| thickness | number | 1.0 | Line width |

```lua
dl.renderLine(100, 100, 200, 200, 255, 0, 0, 255, 2)
```

---

## Rectangles

### `renderRect(x1, y1, x2, y2, red, green, blue, alpha, rounding)`

Draw a rectangle outline.

| Param | Type | Default |
|-------|------|---------|
| x1, y1 | number | 0 | Top-left |
| x2, y2 | number | 0 | Bottom-right |
| red–alpha | number | 255 | Color |
| rounding | number | 0 | Corner radius |

### `renderFilledRect(x1, y1, x2, y2, red, green, blue, alpha, rounding)`

Filled rectangle. Same params as renderRect.

### `renderFilledRectMultiColor(x1, y1, x2, y2, rUL,gUL,bUL,aUL, rUR,gUR,bUR,aUR, rBR,gBR,bBR,aBR, rBL,gBL,bBL,aBL)`

Rectangle filled with per-corner gradient colors. 20 positional args:

```
x1, y1, x2, y2,
rUL, gUL, bUL, aUL,   -- top-left color
rUR, gUR, bUR, aUR,   -- top-right color
rBR, gBR, bBR, aBR,   -- bottom-right color
rBL, gBL, bBL, aBL    -- bottom-left color
```

```lua
dl.renderFilledRectMultiColor(10, 10, 200, 100,
    255, 0, 0, 255,    -- top-left: red
    0, 255, 0, 255,    -- top-right: green
    0, 0, 255, 255,    -- bottom-right: blue
    255, 255, 0, 255   -- bottom-left: yellow
)
```

---

## Triangles

### `renderTriangle(x1,y1, x2,y2, x3,y3, red,green,blue,alpha, thickness)`

Triangle outline.

| # | Param | Default |
|---|-------|---------|
| 1–6 | x1,y1, x2,y2, x3,y3 | 0 | Three vertices |
| 7–10 | red,green,blue,alpha | 255 |
| 11 | thickness | 1.0 |

### `renderFilledTriangle(x1,y1, x2,y2, x3,y3, red,green,blue,alpha)`

Filled triangle. Same as above without thickness.

```lua
dl.renderFilledTriangle(10, 240, 40, 240, 25, 260, 255, 200, 0, 150)
```

---

## Quads

### `renderQuad(x1,y1, x2,y2, x3,y3, x4,y4, red,green,blue,alpha, thickness)`

Quad outline. 13 positional args.

### `renderFilledQuad(x1,y1, x2,y2, x3,y3, x4,y4, red,green,blue,alpha)`

Filled quad. 12 positional args.

```lua
dl.renderFilledQuad(50, 50, 150, 50, 150, 150, 50, 150, 100, 200, 100, 255)
```

---

## Circles

### `renderCircle(cx, cy, radius, red, green, blue, alpha, numSegments, thickness)`

Circle outline.

| # | Param | Default |
|---|-------|---------|
| 1–2 | cx, cy | 0 | Center |
| 3 | radius | 1.0 |
| 4–7 | red–alpha | 255 |
| 8 | numSegments | 0 | Polygon segments (0 = auto) |
| 9 | thickness | 1.0 |

### `renderFilledCircle(cx, cy, radius, red, green, blue, alpha, numSegments)`

Filled circle (no thickness).

```lua
dl.renderFilledCircle(80, 160, 20, 0, 255, 255, 100, 12)
```

---

## Ellipses

### `renderEllipse(cx, cy, radiusX, radiusY, red,green,blue,alpha, rot, numSegments, thickness)`

Ellipse outline.

| # | Param | Default |
|---|-------|---------|
| 1–2 | cx, cy | 0 | Center |
| 3–4 | radiusX, radiusY | 1.0 |
| 5–8 | red–alpha | 255 |
| 9 | rot | 0 | Rotation in radians |
| 10 | numSegments | 0 |
| 11 | thickness | 1.0 |

### `renderFilledEllipse(cx, cy, radiusX, radiusY, red,green,blue,alpha, rot, numSegments)`

Filled ellipse.

---

## N-gons

### `renderNgon(cx, cy, radius, numSegments, red,green,blue,alpha, thickness)`

Regular polygon outline. `numSegments` is **required** (not optional).

### `renderFilledNgon(cx, cy, radius, numSegments, red,green,blue,alpha)`

Filled regular polygon.

```lua
dl.renderFilledNgon(100, 100, 30, 6, 255, 0, 0, 200) -- hexagon
```

---

## Text

### `renderText(x, y, text, red, green, blue, alpha)`

Draw text at position.

| # | Param | Default |
|---|-------|---------|
| 1 | x | 0 |
| 2 | y | 0 |
| 3 | text | "" |
| 4–7 | red–alpha | 255 |

```lua
dl.renderText(100, 100, "Hello", 255, 255, 255, 255)
```

---

## Images

### `renderImage(textureID, x, y, width, height, uvMinX, uvMinY, uvMaxX, uvMaxY)`

Draw an image.

| # | Param | Default |
|---|-------|---------|
| 1 | textureID | 0 | Texture handle |
| 2–3 | x, y | 0 | Position |
| 4–5 | width, height | 0 | Size |
| 6 | uvMinX | 0 |
| 7 | uvMinY | 0 |
| 8 | uvMaxX | 1.0 |
| 9 | uvMaxY | 1.0 |

```lua
dl.renderImage(tex:getId(), 0, 0, 32, 32, 0, 0, 1, 1)
```

### `renderImageQuad(textureID, p1, p2, p3, p4, uvMinX?, uvMinY?, uvMaxX?, uvMaxY?, r?, g?, b?, a?)`

Draw a textured quad with arbitrary corner positions.

| # | Param | Description |
|---|-------|-------------|
| 1 | textureID | Texture handle |
| 2–5 | p1–p4 | Tables with {x=..., y=...} |
| 6–9 | uvMinX–uvMaxY | UV coordinates (default 0,0,1,1) |
| 10–13 | r,g,b,a | Tint color (default 255) |

```lua
dl.renderImageQuad(tex:getId(),
    {x=0, y=0}, {x=100, y=0}, {x=100, y=100}, {x=0, y=100},
    0, 0, 1, 1, 255, 255, 255, 255
)
```

---

## Polygons (Table-arg functions)

These functions take a **table of points** as the first argument:

### `renderPolygon({{x=..., y=...}, ...}, red, green, blue, alpha)`

Draw a filled concave polygon. First arg is a table of `{x=..., y=...}` points.

```lua
dl.renderPolygon(
    {{x=300,y=150}, {x=400,y=150}, {x=400,y=250}, {x=300,y=250}},
    255, 0, 0, 255
)
```

### `renderPolyline(pointsTable, red, green, blue, alpha, flags, thickness)`

Draw connected line segments. Points are a table of `{x=..., y=...}`.

| # | Param | Default |
|---|-------|---------|
| 1 | pointsTable | (required) | Array of `{x, y}` tables |
| 2–5 | red–alpha | 255 |
| 6 | flags | 0 |
| 7 | thickness | 1.0 |

```lua
dl.renderPolyline({{x=10,y=10}, {x=50,y=90}, {x=100,y=10}}, 255, 255, 0, 255, 0, 2)
```

### `renderFilledConvexPolygon(pointsTable, red, green, blue, alpha)`

Draw a filled convex polygon. Points must be ordered clockwise or counter-clockwise.

```lua
dl.renderFilledConvexPolygon(
    {{x=50,y=10}, {x=90,y=90}, {x=10,y=90}},
    0, 255, 0, 200
)
```

---

## Bezier Curves

### `renderBezierCubic(x1,y1, x2,y2, x3,y3, x4,y4, red,green,blue,alpha, thickness, numSegments)`

Cubic Bezier curve (4 control points). 14 positional args.

### `renderBezierQuadratic(x1,y1, x2,y2, x3,y3, red,green,blue,alpha, thickness, numSegments)`

Quadratic Bezier curve (3 control points). 12 positional args.

```lua
dl.renderBezierCubic(10, 50, 50, 10, 100, 90, 200, 50, 0, 255, 255, 255, 2, 10)
```

---

## Clipping

### `pushClipRect(x1, y1, x2, y2, intersect)`

Push a clipping rectangle onto the stack.

| # | Param | Default |
|---|-------|---------|
| 1–4 | x1,y1,x2,y2 | 0 |
| 5 | intersect | false | Intersect with existing clip rect |

### `pushClipRectFullScreen()`

Push a full-screen clip rect.

### `popClipRect()`

Pop the current clip rect.

---

## Texture Stack

### `pushTextureID(id)`

Push a texture ID for subsequent draw calls.

### `popTextureID()`

Pop the current texture ID.
