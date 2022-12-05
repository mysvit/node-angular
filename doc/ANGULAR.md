# Angular

<!-- toc -->

- [Update](#update)
- [Android](#android)
    - [Setup](#setup)
    - [Build](#build)
- [Material](#material)
    - [mat-icon](#mat-icon)
- [CSS](#css)
    - [Overlapping](#overlapping)
    - [Add custom style to nativeElement](#add-custom-style-to-nativeElement)

<!-- tocstop -->

## Update

Install latest `angular cli`

``` bash
sudo npm install --location=global @angular/cli@latest
```

run in project folder and get information about what need update

``` bash
ng update

Name                               Version                  Command to update
--------------------------------------------------------------------------------
@angular/cdk                       14.2.6 -> 14.2.7         ng update @angular/cdk
@angular/cli                       14.2.6 -> 14.2.7         ng update @angular/cli
@angular/core                      14.2.5 -> 14.2.6         ng update @angular/core
```

Run commands what needed. Start with cli as it used for update others:

```bash
ng update @angular/cli
```

## Android

### Setup

Install capacitor

```bash
npm install @capacitor/core
npm install -D @capacitor/cli
```

Init capacitor config

```bash
npx cap init
```

it will create `capacitor.config.ts`

### Build

Build android folder

```bash
ng build
npm install @capacitor/android
npx cap add android

# sync web with android
npx cap sync
# open in android studio
npx cap open android

```

## Material

### mat-icon

**FOR ICON**

Add to index.html

```html

<link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
      rel="stylesheet">
```

Add to app.module

```typescript
export class AppModule {
    constructor(iconRegistry: MatIconRegistry) {
        iconRegistry.setDefaultFontSetClass('material-icons-outlined')
    }
}
```

Set custom font if you needed

```html

<mat-icon fontSet="material-icons-outlined">info</mat-icon>
<mat-icon fontSet="material-icons-two-tone">info</mat-icon>
<mat-icon fontSet="material-icons-round">info</mat-icon>
<mat-icon fontSet="material-icons-sharp">info</mat-icon>
```

**FOR SYMBOL**

Add to index.html

```html

<link rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"/>
```

Add to app.module

```typescript
export class AppModule {
    constructor(iconRegistry: MatIconRegistry) {
        iconRegistry.setDefaultFontSetClass('material-symbols-outlined')
    }
}
```

Add to global scss file

```scss
// default class
// add <class="fill"> for fill icons
.material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;

    &.fill {
        font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48;
    }
}
```

Set custom font if you needed

```html

<mat-icon>info</mat-icon>                   // default
<mat-icon class="fill">info</mat-icon>      // filed
```

## CSS

### Overlapping

```CSS
.container {
    display: grid;
}

.main .overlap {
    grid-area: 1/1;
}
```

```HTML

<div class="container">
    <div class="main"></div>
    <div class="overlap"></div>
</div>
```

### Add custom style to nativeElement

```typescript
    ref.location.nativeElement.style = `left: 50px; top: 30px;`
```
