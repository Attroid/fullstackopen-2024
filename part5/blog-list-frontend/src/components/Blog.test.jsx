/*
Make a test, which checks that the component displaying a blog renders
the blog's title and author, but does not render its URL or number of
likes by default.

Add CSS classes to the component to help the testing as necessary.
*/
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

describe("Blog component", () => {
  test("renders blog's title and author by default while excluding URL and number of likes", () => {
    const blog = {
      id: "fake-blog-id-123",
      title: "Ruoho on vihreampaa aidan toisella puolella",
      author: "Matti Meikalainen",
      url: "http://taakse.poistu",
      likes: 5,
      user: {
        id: "fake-user-id-123",
        username: "fakeuser",
        name: "Fake User",
      },
    };

    render(
      <Blog blog={blog} onLike={() => {}} onRemove={() => {}} hasAccess />
    );

    expect(screen.getByText(blog.title)).toBeDefined();
    expect(screen.getByText(blog.author)).toBeDefined();
    expect(
      screen.queryByText((content) => content.includes(blog.url))
    ).toBeNull();
    expect(
      screen.queryByText((content) => content.includes(`likes ${blog.likes}`))
    ).toBeNull();
  });
});
