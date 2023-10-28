import { test, expect } from "vitest";
import { screen, fireEvent } from "@testing-library/react";

import { mockServer, renderInContext } from "@wasp/test";
import CreateBook from "./CreateBook";

const { mockApi } = mockServer();

test("CreateBook component", async () => {
  // Mock the API endpoint for book creation with a POST method
mockApi({ method: 'POST', path: '/create-book' }, { success: true });

  // Render the CreateBook component
  renderInContext(<CreateBook />);

  // Find the input fields and submit button
  const titleInput = screen.getByLabelText("Title:");
  const authorInput = screen.getByLabelText("Author:");
  const submitButton = screen.getByText("Create Book");

  // Fill in the input fields
  fireEvent.change(titleInput, { target: { value: 'My Book' } });
  fireEvent.change(authorInput, { target: { value: 'Me' } });

  // Click the submit button
  fireEvent.click(submitButton);
  screen.debug();

  // If there's a response message on success, you could check for that.
  // This assumes there's text displaying "Book created successfully" upon success.
  const successMessage = await screen.findByText("Book created successfully", {}, { timeout: 10000 });
  expect(successMessage).toBeInTheDocument();
});
