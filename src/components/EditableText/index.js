import React from 'react';

function EditableText(WrappedComponent, InputComponent) {
  return class extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        editing: false
      };
    }

    toggleEdit = e => {
      this.setState(
        {
          editing: true
        },
        () => {
          this.inputEl.focus();
        }
      );
    };

    render() {
      const { editing } = this.state;
      const { inputStyles, rows, rowsMax, value, ...otherProps } = this.props;
      if (editing === false && value !== '') {
        return (
          <WrappedComponent
            onClick={this.toggleEdit}
            style={{ ...this.props.style }}
            ref={domNode => {
              this.domElm = domNode;
            }}
            {...otherProps}>
            {this.props.value}
          </WrappedComponent>
        );
      } else {
        return (
          <InputComponent
            style={{
              ...inputStyles
            }}
            inputRef={domNode => {
              this.inputEl = domNode;
            }}
            onChange={e => {
              this.setState({ editing: true });
              this.props.onChange(e.target.value);
            }}
            value={this.props.value}
            placeholder={this.props.placeholder}
            multiline
            rows={rows}
          />
        );
      }
    }
  };
}

export default EditableText;
