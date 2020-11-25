import BlogApi from 'lib/api/blogs'
import auth0 from 'utils/auth0'

export default async function getUserBlogs(req, res) {
  try {
    const { accessToken } = await auth0.getSession(req)
    const json = await new BlogApi(accessToken).getByUser()
    return res.json(json.data)
  } catch (error) {
    res.status(error.status || 400).end(error.message)
  }
}
