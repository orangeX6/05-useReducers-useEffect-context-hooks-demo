/*


#hooks 
-> useState
-> useEffect
-> useRef
-> useReducer 

# RULES OF HOOKS 
>>  1.1 Only call react hooks in react functions
>>  1.2 Custom hooks 
>>  2.1 Only call React Hooks at the top level 
>>  3. In useEffect() - ALWAYS ADD everything you refer to inside of useEffect as a dependency unless there is a good reason not to. (eg - only call useEffect on initial state render)


#   useReducer
-> const [state, dispatchFn] = useReducer(reducerFn, initialState, initFn)
>> useReducer is a good replacement of useState when you have two states that belong together and/or if you have state updates that depends on other state

>> useReducer just like useState returns 2 arrays. The function on the useReducer hook dispatches a new action(i.e a trigger an update of the state)
>> The action will be consumed by the first argument you pass to the useReducer

>> reducerFn --> (prevState, action) => newState 
>> A function that is triggered automatically once an action is dispatched   (via dispatchFn()) - it receives the latest state snapshot and should return the new, updated state

>> initialState - to set initial State
>> initFn - a function to set the initial state programmatically

# importing React, whats called behind the scenes - 
# when we use jsx the following code is executed behind the scenes
return React.createElement(element, attribute arguments, content between opening and closing tags )

Example -
-> import React from 'react'
->import Expenses from './Expenses'
->
->JSX ->
->return (
->  <div>
->    <h2> Let's get started</h2>
->    <Expenses items={expenses} />
->  </div>
->)
->
->BEHIND THE SCENES ->
->return React.createElement(
->  'div',
->  {}, 
->  React.createElement('h2',{},'Let'\s get started')
->  React.createElement(Expenses, {items: expenses})
->  )

-> useState 
-> if your state update depends on the previous state, the following
>> useState gives access to a prevState variable which holds the previous state of the object we are updating 

 const [userInput, setUserInput] = useState({
    title: '',
    amount: '',
    date: '',
  });


  const titleChange = e => {
    setUserInput((prevState)=>{
    return {...prevState, title: e.target.value}
  })
  }

  // if you are setting style prop as background-color which has a (-) dash in it, make sure to define it in either of the two ways
//-> {'background-color':'red'}
//->{backgroundColor:'red'}



# TAGGED TEMPLATE LITERAL SYNTAX
-> Its a javascript feature 
->>  const Button = styled.button``
>> button is simply a method on styled object. Style object is an object we are importing from style components and there we can access the button method.
-> its just a special kind of method,, which we call with `` instead of ().

# CSS Modules 
>>What CSS Modules does or what this concept of CSS Modules does is it takes those CSS classes and a CSS file and basically changes those class names to be unique.

>> Importing css module file 
-> import styles from './Button.module.css';

-> Naming a module file 
>>Button.module.css


# workarounds around using jsx. 
-> if we want to render multiple components we usually wrap them in a <div>. This will create unnecessary divs rendered in the final output. So we can use - 

-> 1.
Arrays -
return (
    [
        <Form />,
        <Button/>
    ]
)


-> 2. Wrapper component 
const Wrapper = props => {
    return props.children;
}
export default Wrapper;

-> 3. React Fragment
<></> or <React.Fragment></React.Fragment>


# PORTAL
-> With portal you can display a div as a sibling to the root div and not a children to root div. This is useful while building modal like components

# REACT CONTEXT (CONTEXT API)
-> React Context allows us to manage State behind the scenes in React, such that we are able to directly change it from any component in our App and directly pass it to any component in our app without building a prop chain.

>>  defining context
const authContext = React.createContext({isLoggedIn:false})

export default AuthContext

>> Providing context 
? Providing means that you wrap in JSX code all the components that should be able to tap into that Context. Any component thats not wrapped will not be able to listen to the context component
<ContextName.Provider>
  <ComponentWhoWantsToAccessContext />
</ContextName.Provider>

>>Listening to Context
? To get access to the context value we have to listen to it and we can do that in 2 ways - 
->  AuthContext Consumer
->  React Hook

>> We can also add A custom context provider component in context api 

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
});

The data in object we create using React.createContext can be a dummy data which explains the structure of the context. 

->> CONTEXT LIMITATIONS 
>> Where to use Props vs Context
-> Props for configuration, context for state management across the app
>> React Context is NOT OPTIMIZED for high frequency changes
>> React context also should not be used to replace ALL component communications and props


*/
