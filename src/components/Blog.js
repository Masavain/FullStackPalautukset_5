import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggle = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }
    const user = this.props.blog.user === undefined ? '' : `added by ${this.props.blog.user.name}`

    return (
      <div style={blogStyle}>
        <div style={hideWhenVisible}>
          <p onClick={this.toggle}>{this.props.blog.title}</p>
        </div>
        <div style={showWhenVisible}>
          <p onClick={this.toggle}>{this.props.blog.title}</p>
          <a href={this.props.blog.url}>{this.props.blog.url}</a>           
          <div>
            {this.props.blog.likes} likes 
            <button>like</button>
          </div>
          <div>
            { user }
          </div>

        </div>
      </div>
    )
  }
}

export default Blog