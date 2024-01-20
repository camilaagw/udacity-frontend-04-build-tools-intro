/**
 * @jest-environment jsdom
 */

import { handleSubmit } from "../src/client/js/formHandler";

// Mock the global fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      score_tag: 'P',
      agreement: 'AGREEMENT',
      subjectivity: 'SUBJECTIVE',
      confidence: '100',
      irony: 'NONIRONIC'
    }),
  })
);

// Mock the Client object and its checkForUrl method
global.Client = {
  checkForUrl: jest.fn()
};

// A helper function to reset the mocked function before each test
beforeEach(() => {
  fetch.mockClear();
  Client.checkForUrl.mockClear();
});

describe("Testing the submit functionality", () => {
  test("Testing the handleSubmit() function with invalid URL", () => {
    // Set up our document body
    document.body.innerHTML = `<input id="name" type="text" value="invalid_url" />
    <div id="confidence"></div>
    <div id="score_tag"></div>
    <div id="agreement"></div>
    <div id="subjectivity"></div>
    <div id="irony"></div>`;

    // Mock the checkForUrl method to return false
    Client.checkForUrl.mockReturnValue(false);

    // Mock window.alert
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    // Call the handleSubmit function
    handleSubmit({ preventDefault: () => {} });

    // Test assertions
    expect(Client.checkForUrl).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Invalid URL, please try again with a valid URL.');
  });

  test("Testing the handleSubmit() function with valid URL", async () => {
    // Set up our document body
    document.body.innerHTML = `<input id="name" type="text" value="https://example.com" />
    <div id="confidence"></div>
    <div id="score_tag"></div>
    <div id="agreement"></div>
    <div id="subjectivity"></div>
    <div id="irony"></div>`;

    // Mock the checkForUrl method to return true
    Client.checkForUrl.mockReturnValue(true);

    // Call the handleSubmit function
    await handleSubmit({ preventDefault: () => {} });

    // Test assertions
    expect(Client.checkForUrl).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalled();
    expect(document.getElementById("confidence").textContent).toEqual("Confidence: 100");
    expect(document.getElementById("score_tag").textContent).toEqual("Score Tag: Positive");
    expect(document.getElementById("agreement").textContent).toEqual("Agreement: AGREEMENT");
    expect(document.getElementById("subjectivity").textContent).toEqual("Subjectivity: SUBJECTIVE");
    expect(document.getElementById("irony").textContent).toEqual("Irony: NONIRONIC");
  });
});
