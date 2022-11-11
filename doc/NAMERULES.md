# NodeJS & Angular naming

<!-- toc -->

- [Data interface](#data-interface)
- [Angular event](#angular-event)

<!-- tocstop -->

## Data interface

Naming for interfaces:

- Database table:<span style="color: blue"> [Name][**s**]**Tbl** </span>
- All tables in plurals

```typescript
interface CommentsTbl {
}
```

- get data from server to client: <span style="color: blue"> [Name]**Item** </span>

```typescript
interface CommentItem {
}
```

- Send data from client to server:  <span style="color: blue"> [Name]**Model** </span>

```typescript
interface CommentModel {
}
```

## Angular event

Component Event declaration: @Output() <span style="color: blue"> **on**[Name] </span>

```
@Output() onSave: EventEmitter<string> = new EventEmitter<string>()
```

Create handle of this event when declare component:  <span style="color: blue"> **handle**[Name]**Event** </span>

```typescript
(onCommentReply) = "handleCommentReplyEvent(item)"
```
