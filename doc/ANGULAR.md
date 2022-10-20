# Angular

<!-- toc -->

- [Update](#update)
- [Material](#material)
  - [mat-icon](#mat-icon)


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
@angular/cdk                       13.3.3 -> 14.0.5         ng update @angular/cdk
@angular/cli                       14.0.2 -> 14.0.6         ng update @angular/cli
@angular/core                      14.0.2 -> 14.0.6         ng update @angular/core
```
Run commands what needed. For example start with core:
```bash
ng update @angular/core
```


## Material

### mat-icon

Add to index.html
```html
<link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp" rel="stylesheet">
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
