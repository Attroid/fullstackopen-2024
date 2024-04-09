import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

describe("BlogForm component", () => {
  test("calls props.onSubmit with entered values", async () => {
    const user = userEvent.setup();
    const onSubmitMock = vi.fn();

    const { container } = render(<BlogForm onSubmit={onSubmitMock} />);

    const dataToEnter = {
      title: "Testing BlogForm title input",
      author: "Testing BlogForm author input",
      url: "www.testing-blog-form-url-input.com",
    };

    const titleInput = container.querySelector("#blog-form-title");
    const authorInput = container.querySelector("#blog-form-author");
    const urlInput = container.querySelector("#blog-form-url");
    const createButton = screen.getByText("create");

    await user.type(titleInput, dataToEnter.title);
    await user.type(authorInput, dataToEnter.author);
    await user.type(urlInput, dataToEnter.url);
    await user.click(createButton);

    expect(onSubmitMock.mock.calls).toHaveLength(1);

    expect(onSubmitMock.mock.calls[0][0]).toEqual(dataToEnter);
  });
});
