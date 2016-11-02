//dependencies
import React, {PropTypes, PureComponent} from 'react';
import ReactDOM from 'react-dom';
import identity from 'lodash/identity';
import i18next from 'i18next';
import MDBehaviour from '../behaviours/material';
const MODE = {isEdit: true};

/**
 * Component standing for an HTML input.
 */
@MDBehaviour('inputText')
class InputText extends PureComponent {

    /**
     * Get the dom value of the component.
     * @return {object} - The unformated dom value.
     */
    getValue = () => {
        const {unformatter} = this.props;
        const domEl = ReactDOM.findDOMNode(this.refs.htmlInput);
        return unformatter(domEl.value, MODE);
    };
    componentDidUpdate() {
        const {error} = this.props;
        if (!error) {
            // Make sure that the main div does not hold a is-invalid class when there's no error
            // MDL keeps the class even if React removes it
            this.refs.inputText.classList.remove('is-invalid');
        }
    }
    /**
     * Handle the change on the input text, it only propagate the value.
     * @param  {object} evt - The react DOM event.
     * @return {object} - The function onChannge from the props, called.
     */
    _handleInputChange = (evt) => {
        const {unformatter, onChange} = this.props;
        const {value} = evt.target;
        return onChange(unformatter(value, MODE));
    };
    /**
     * @inheritdoc
     * @override
    */
    render() {
        const { autoFocus, disabled, formatter, maxLength, onFocus, onClick, onKeyDown, onKeyPress, error, name, placeholder, style, rawInputValue, size, type} = this.props;
        const value = formatter(rawInputValue, MODE);
        console.log('input-text', rawInputValue, value);
        const pattern = error ? 'hasError' : null; //add pattern to overide mdl error style when displaying an focus error.
        const inputProps =  { autoFocus, disabled, onKeyDown,onKeyPress, maxLength, onFocus, onClick, id: name, onChange: this._handleInputChange, pattern, size, type, value };
        const cssClass = `mdl-textfield mdl-js-textfield${error ? ' is-invalid' : ''}`;
        return (
            <div className={cssClass} data-focus='input-text' ref='inputText' style={style}>
                <input className='mdl-textfield__input' ref='htmlInput' {...inputProps} />
                <label className='mdl-textfield__label' htmlFor={name}>{i18next.t(placeholder)}</label>
                {error && <span className='mdl-textfield__error'>{i18next.t(error)}</span>}
            </div>
        );
    }
}

//Static props.
InputText.displayName = 'InputText';
InputText.propTypes = {
    disabled: PropTypes.bool,
    error: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func,
    placeholder: PropTypes.string,
    unformatter: PropTypes.func,
    formatter: PropTypes.func,
    type: PropTypes.string,
    rawInputValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};
InputText.defaultProps = {
    disabled: false,
    formatter: identity,
    unformatter: identity,
    type: 'text'
};
export default InputText;
