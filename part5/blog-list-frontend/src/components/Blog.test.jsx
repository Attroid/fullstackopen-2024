import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";

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

  test("renders URL and number of likes after user clicks 'view' button", async () => {
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

    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    expect(screen.getByText(blog.url)).toBeDefined();
    expect(screen.getByText(`likes ${blog.likes}`)).toBeDefined();
  });

  test("calls props.onLike when user clicks 'like' button", async () => {
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

    const onLikeMock = vi.fn();

    render(
      <Blog blog={blog} onLike={onLikeMock} onRemove={() => {}} hasAccess />
    );

    const user = userEvent.setup();
    const viewButton = screen.getByText("view");
    await user.click(viewButton);

    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(onLikeMock.mock.calls).toHaveLength(2);
  });
});
