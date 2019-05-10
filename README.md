Load fonts quickly and easily. Wrapper for [Font Face Observer](https://github.com/bramstein/fontfaceobserver).

```js
import loadFonts from '@fuzzco/font-loader'

loadFonts([
    {
        name: 'Font Name',
        weights: [300, 400, 700],
        styles: ['normal', 'italic']
    }
])
```

## HTML/CSS

You'll need to declare the fonts you want to use in your CSS. For example, in `<head>`:

```html
<head>
    <link
        href="https://fonts.googleapis.com/css?family=Oswald"
        rel="stylesheet"
    />
</head>
```

## JS

You can pass an object with string `name` (required) and arrays `weights` and/or `styles`:

```js
loadFonts({
    name: 'Font Name',
    weights: [400], // optional
    styles: ['normal'] // optional
})
```

Or an array of such objects:

```js
loadFonts([
    {
        name: 'Font Name',
        weights: [400, 700],
        styles: ['normal', 'italic']
    },
    {
        name: 'Second Font',
        weights: [400, 500],
        styles: ['normal']
    }
])
```

You can also treat the result as a promise:

```js
// chaining:
loadFonts({ name: 'Font Name', weights: [400, 700] }).then(
    result => console.log(result) // prints an array of the fonts loaded
)

// async/await
const result = await loadFonts({ name: 'Font Name', weights: [400, 700] })
console.log(result) // prints an array of the fonts loaded
```

## Uses

Very useful for adding loading classes to avoid a flash of unstyled text:

```js
document.body.classList.add('fonts-loading')
try {
    await loadFonts({ name: 'Font Name' })
    document.body.classList.add('fonts-loaded')
} catch {
    document.body.classList.add('fonts-error')
} finally {
    document.body.classList.remove('fonts-loading')
}
```

---

[Fuzzco](https://fuzzco.com)
