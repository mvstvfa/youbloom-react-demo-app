import { getUsers } from "./api";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: () =>
        Promise.resolve([{ id: 1, name: "John Doe", email: "john@test.com" }]),
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

test("getUsers returns user list from API", async () => {
  const users = await getUsers();

  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(users).toHaveLength(1);
  expect(users[0].name).toBe("John Doe");
});