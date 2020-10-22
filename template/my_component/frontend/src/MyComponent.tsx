import React, { ReactNode } from "react"
import {
  withStreamlitConnection,
  StreamlitComponentBase,
  Streamlit,
} from "./streamlit"

interface State {
  numClicks: number
}

/**
 * This is a React-based component template. The `render()` function is called
 * automatically when your component should be re-rendered.
 */
class MyComponent extends StreamlitComponentBase<State> {
  public state = { numClicks: 0 }

  public render = (): ReactNode => {
    // Arguments that are passed to the plugin in Python are accessible
    // via `this.props.args`. Here, we access the "name" arg.
    const name = this.props.args["name"]

    const spanStyle = {
        backgroundColor: 'rgba(39, 51, 70, 1)',
        color: 'white',
        display: 'flex',
        flexDirection: 'row' as "row",
        "justify-content": "flex-end",
    }

    const buttonStyle = {
        "background-image": "linear-gradient(257.59deg, #E78CAE 46.23%, #BDCDFF 104.88%)",
        "border-radius": '100px',
        border: "0px solid transparent",
        padding: '0 2rem 0 2rem',
        margin: '0 1rem 0 0',
    }

    const linkStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        color: 'white',
        "border-radius": '100px',
        border: "0px solid transparent",
        padding: '0 2rem 0 2rem',
        margin: '0 1rem 0 0',
    }

    // Show a button and some text.
    // When the button is clicked, we'll increment our "numClicks" state
    // variable, and send its new value back to Streamlit, where it'll
    // be available to the Python program.
    return (
      <div style={spanStyle}>
        <button onClick={this.onClicked} disabled={this.props.disabled} style={buttonStyle}>
          Predict
        </button>
        <button style={linkStyle}>
          Cancel
        </button>
      </div>
    )
  }

  /** Click handler for our "Click Me!" button. */
  private onClicked = (): void => {
    // Increment state.numClicks, and pass the new value back to
    // Streamlit via `Streamlit.setComponentValue`.
    this.setState(
      prevState => ({ numClicks: prevState.numClicks + 1 }),
      () => Streamlit.setComponentValue(this.state.numClicks)
    )
  }
}

// "withStreamlitConnection" is a wrapper function. It bootstraps the
// connection between your component and the Streamlit app, and handles
// passing arguments from Python -> Component.
//
// You don't need to edit withStreamlitConnection (but you're welcome to!).
export default withStreamlitConnection(MyComponent)
