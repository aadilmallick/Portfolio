# Border Gradients

Using pseudoelements and a conic gradient, we can animate a border gradient around an element by animating the angle of the gradient.

---

## Basic Glow

First, create a container element that has `position: relative` because you'll need this to absolutely position the pseudoelements.

Create two pseudoelements, `::before` and `::after`, that are the same size as the container. Add some padding so they're slightly bigger, then move them behind the container. Finally, center them on the container so they form a halo effect.

```css
.card::after,
.card::before {
  content: "";
  /* 1. Make same size and center */
  position: absolute;
  height: 100%;
  width: 100%;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  /* 2. Move behind container */
  z-index: -1;
  /* 3. Add padding to make bigger than container and poke out from behind */
  padding: 3px;
  border-radius: 10px;
}
```

Apply a conic gradient to both pseudoelements.

```css
.card::after,
.card::before {
  background-image: conic-gradient(from 0deg, #ff4545, #ff0095, #ff4545);
}
```

On one of the pseudoelements, add a blur filter to create more of a glow effect.

```css
.card::before {
  filter: blur(1.5rem);
  opacity: 1; /* decrease opacity if you want to reduce glow */
}
```

Here is an example of a **relative positioned container**.

```css
.card {
  margin: 0 auto;
  padding: 2em;
  width: 300px;
  background: #1c1f2b;
  text-align: center;
  border-radius: 10px;
  position: relative;
}
```

To animate the border gradient, you'll need to define a **spinning animation** and apply it to the pseudoelements.

```css
.card::after,
.card::before {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  background-image: conic-gradient(
    from 0deg,
    #ff4545,
    #00ff99,
    #006aff,
    #ff0095,
    #ff4545
  );
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  z-index: -1;
  padding: 3px;
  border-radius: 10px;
  animation: 3s spin linear infinite;
}
```

Remember to apply the blur filter to the `::before` pseudoelement to create the glow effect.

```css
.card::before {
  filter: blur(1.5rem);
  opacity: 1; /* decrease opacity if you want to reduce glow */
}
```
