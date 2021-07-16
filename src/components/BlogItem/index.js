import './index.css'

const BlogItem = props => {
  const {itemData} = props
  const {title, body, userid} = itemData
  return (
    <div className="blog-item-container">
      <div className="blog-item-header">
        <p className="blog-item-title">{title}</p>
        <p className="blog-item-user-id">{userid}</p>
      </div>
      <p className="blog-item-body">{body}</p>
    </div>
  )
}
export default BlogItem
