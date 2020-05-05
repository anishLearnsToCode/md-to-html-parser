# md-to-html-parser

As the name makes evidently clear. This project is a markdown to html parser.

It takes in valid markdown strings and will return a valid html snippet.

## Examples

### Bold
```markdown
this is markdown for representing text in __bold__
``` 
this is markdown for representing text in __bold__

The output in html will be 
```html
this is markdown for representing text in <b>bold</b>
```

### Italics
```markdown
this is markdown for representing text in _italics_
``` 
this is markdown for representing text in _italics_

The output in html will be 
```html
this is markdown for representing text in <em>bold</em>
```

### Strike Through
```markdown
this is markdown for representing text in ~strikethrough~
``` 
this is markdown for representing text in ~~strikethrough~~

The output in html will be 
```html
this is markdown for representing text in <strike>strikethrough</strike>
```
