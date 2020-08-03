# Markdown to HTML Parser

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

### Block Quotes
```markdown
> This is a blockquote text
```

```html
<blockquote>This is a blockquote text</blockquote>
```

### Ordered Lists
```markdown
Ordered List
1. point 1
1. point 2
1. point 3
```

```html
<p>Ordered List</p>
<ol>
    <li>point 1</li>
    <li>point 2</li>
    <li>point 3</li>
</ol>
```

### Unordered Lists
```markdown
Unordered Lists
- apples
- bananas
- tomatoes
```

```html
<p>Unordered List</p>
<ul>
    <li>apples</li>
    <li>bananas</li>
    <li>tomatoes</li>
</ul>
```

### Code
```markdown
`let i = 10;`
```

```html
<code>let i = 10;</code>
```

### Fenced Code Block
```text
``java
package trees;

public class PreorderTraversal {
    public static void main(String[] args) {
        Tree root = new Tree();
        root.input();
        root.print();

        preOrder(root);
    }

    private static void preOrder(Tree root){
        if(root == null)
            return;

        System.out.print(root.data + " ");
        preOrder(root.left);
        preOrder(root.right);
    }
}
``
```

```html
<pre>
    package trees;
    
    public class PreorderTraversal {
        public static void main(String[] args) {
            Tree root = new Tree();
            root.input();
            root.print();
    
            preOrder(root);
        }
    
        private static void preOrder(Tree root){
            if(root == null)
                return;
    
            System.out.print(root.data + " ");
            preOrder(root.left);
            preOrder(root.right);
        }
    }
</pre>
```

### Horizontal Rule
```markdown
---
```

```html
<hr>
```

### Link
```markdown
[Google](https://www.google.com)
```

```html
<a href="https:www.google.com">Google</a>
```

### Images
```markdown
![alt-text](image-path)
![banana](https://raw.githubusercontent.com/anishLearnsToCode/fruit-stall-poster/master/assets/banana.jpg)
```

```html
<img src="https://raw.githubusercontent.com/anishLearnsToCode/fruit-stall-poster/master/assets/banana.jpg" alt="banana">
```

### Tables
```markdown
| Tables   |      Are      |  Cool |
|----------|:-------------:|------:|
| col 1 is |  left-aligned | $1600 |
| col 2 is |    amazing   |   $12 |
| col 3 is | 😀😀 |    $1 |
```

```html
<table>
    <thead>
        <tr>
            <th>Tables</th>
            <th>Are</th>
            <th>Cool</th>
        </tr>
    </thead>

    <tbody>
        <tr>
            <td>col 1 is</td>
            <td>left-aligned</td>
            <td>$1600</td>
        </tr>
        <tr>
            <td>col 2 is</td>
            <td>amazing</td>
            <td>$12</td>
        </tr>
        <tr>
            <td>col 3 is</td>
            <td>😀😀</td>
            <td>$1</td>
        </tr>
    </tbody>
</table>
```
