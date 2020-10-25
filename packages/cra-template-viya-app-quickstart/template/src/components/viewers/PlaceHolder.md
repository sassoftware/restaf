## Adding your own app to this application

It is basically two steps.

1. Step 1: Develop your main app component in the viewers directory. You can use any react library. By default this project include @material-ui. But you can use any component library.

2. Step 2: Edit appMenus.js and add your application as a menu item. The format of a menu in the array in AppMenus.js is as follows:
let us assume that your new component is called Mydemo.js

```atom
{
    component: 'MyDemo',
    props    : {
        text: 'My cool app',
        ... additional props as needed
    },
}

The ccomponent name must match the name of the component you created.

The text will appear as the selection in the menu displayed by Home.js

The props will be available in your component - see below on how you can access these.

## Writing  your component

This is a standard react component. The props passed to this component are in two groups.

### Group 1 Props

The props object includes the followig:

1. All the prop that were passed to App.js in your index.js

2. This list is enhanced with the following:

    - store -- restaf store object
    - host  -- your current SAS Viya url
    - appName -- the name of your application
    - appProps -- this is the props object you specify in the menu definition

3. The props provided in the menu defintion are available thru history as follows:

```atom
import { useLocation } from 'react-router-dom';
    <snip>
let location = useLocation();
let appProps = location.state;

```
appProps now has the props specified in the appMenu.js for this component

As an example the props for the "Browse Folders" menu item is defined in App.js as shown below

```atom
let m = {
    component: 'ViewList',
    props: {
        text: 'Browse Folders',
        service: 'folders',
        initialTab: 0,
        tabs: [
            { label: 'Summary', component: 'SummaryViewer' },
            { label: 'Viewer', component: 'DefaultViewer' },
        ],
    },
},
```

Notes:

1. The path value is used in Home as the route target when the item is selected by user.

2. The props.text is used as display text in the Home menu

3. The other contents of props are specific to the component that is the target of that route. These targets are part of the route specifications in App.js. For example the target component for /viewList is itemsViewer.js in the viewrs directory.

