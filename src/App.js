import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      title: '',
      author: '',
      url: '',
      error: null,
      notif: null,
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  logout = async (event) => {
    window.localStorage.removeItem('loggedUser')
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      this.setState({ username: '', password: '', user })

    } catch (exception) {
        this.setState({
          error: 'wrong username or password'
        })
        setTimeout(() => {
          this.setState({ error: null })
        }, 5000)
      }
  }

  addBlog = (event) => {
    event.preventDefault()
    const blog = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }

    blogService
      .create(blog)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          title: '',
          author: '',
          url: '',
          notif: `a new blog '${newBlog.title}' by ${newBlog.author} added`
        })
        setTimeout(() => {
          this.setState({ notif: null })
      }, 5000)
      })

  }
  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleBlogFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }


  render() {

    const blogForm = () => (
      <div>
        <h2>create new</h2>

        <form onSubmit={this.addBlog}>
          <div>
            title
          <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleBlogFieldChange}
            />
          </div>
          <div>
            author
          <input
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleBlogFieldChange}
            />
          </div>
          <div>
            url
          <input
              type="text"
              name="url"
              value={this.state.url}
              onChange={this.handleBlogFieldChange}
            />
          </div>
          <button type="submit">save</button>
        </form>
      </div>
    )

    if (this.state.user === null) {
      return (
        <div>
          <Notification type="error" message={this.state.error} />

          <h2>Kirjaudu sovellukseen</h2>
          <form onSubmit={this.login}>
            <div>
              käyttäjätunnus
            <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleLoginFieldChange}
              />
            </div>
            <div>
              salasana
            <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleLoginFieldChange}
              />
            </div>
            <button type="submit">kirjaudu</button>
          </form>
        </div>
      )
    }

    return (
      <div>
        <Notification type="notif" message={this.state.notif} />

        <div>
          {this.state.user.name} logged in
          <button onClick={this.logout}> log out</button>
        </div>
        <h2>blogs</h2>
        {this.state.blogs.map(blog =>
          <Blog key={blog._id} blog={blog} />
        )}
        {blogForm()}
      </div>

    )
  }
}


export default App;
