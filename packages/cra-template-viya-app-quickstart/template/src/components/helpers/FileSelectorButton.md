```js
/* See viewers/ComputeService for a use case */

 const _onFileSelect = (src, name) => {
     if (src === null) {
         /* user did not select anything  - so take proper action*/
     } else {
         /* handle the new selection*/

     }

 }
<FileSelectorButton buttonText="Select a SAS program" onSelect={_onFileSelect}></FileSelectorButton>

```
