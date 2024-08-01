<a name="useField"></a>

## useField(fieldId, [options], [deps]) ⇒ <code>IFieldInfo</code> \| <code>null</code> \| <code>undefined</code>
Returns a field from web or list.

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| fieldId | <code>string</code> | Field internal name or Id. Changing the value resends request. |
| [options] | <code>FieldOptions</code> | PnP hook options. |
| [deps] | <code>DependencyList</code> | useField refreshes response data when one of the dependencies changes. |

**Example** *( Get web fields )*
```js
const webFields = useFields();
```
**Example** *( Get list fields )*
```js
const listFields = useFields({
   list: "5ee53613-bc0f-4b2a-9904-b21afd8431a7"
});
```
**Example** *( Get list fields with query )*
```js
const listFields = useFields({
   list: "My List Title",
   query : {
     select: ["InternalName", "Title", "Id"]
   }
});
```

