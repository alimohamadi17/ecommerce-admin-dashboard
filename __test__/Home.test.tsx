// import { expect } from "@jest/globals";

import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import BillBoradsPage from "../app/(dashboard)/[storeId]/(routes)/page";
import BillboardClient from "@/app/(dashboard)/[storeId]/(routes)/billboards/components/client";
// import { useParams, usePathname, useRouter } from "next/navigation";
import MainNav from "../components/MainNav";
import userEvent from "@testing-library/user-event";
import Router, { usePathname, useSearchParams } from "next/navigation";

// const useRouter = jest.spyOn(require('next/router'), 'useRouter')
// nextRouter.useRouter = jest.fn();
// nextRouter.useRouter.mockImplementation(() => ({ route: '/' }))

// jest.mock("next/router", () => ({
//   useRouter() {
//     return {
//       route: "",
//       pathname: "",
//       query: "",
//       asPath: "",
//     };
//   },
// }));
// const useRouter = jest.spyOn(require("next/navigation"), "useRouter");

///=======////
// jest.mock("next/navigation", () => ({
//   useParams: jest.fn().mockReturnValue({ id: 12345 }),
//   useRouter() {
//     return {
//       route: "/billboards",
//       pathname: "/billboards",
//       query: "",
//       asPath: "",
//     };
//   },
// }));
///=======///

// const navigate = jest.fn();
// beforeEach(() => {
//   jest.spyOn(nextRouter, "useRouter").mockImplementation(() => navigate());
// });

jest.mock("next/navigation", () => ({
  useParams: jest.fn().mockReturnValue({ id: 12345 }),
  usePathname: jest.fn().mockReturnValue({ id: 12345, pathname: "billboards" }),
  useRouter: jest.fn(),
}));

test("should ", () => {
  render(<BillboardClient data={[]} />);
  const element = screen.getByRole("button", { name: "Add New" });
  expect(element).toBeInTheDocument();
});

test("should 2 ", () => {
  const pushMock = jest.fn(); // Create a mock function for router.push
  const useRouterMock = jest.requireMock("next/navigation").useRouter; // Get the mocked useRouter

  // Set up the mock behavior
  useRouterMock.mockReturnValue({
    push: pushMock,
  });
  render(<BillboardClient data={[]} />);

  const element = screen.getByRole("button", { name: "Add New" });
  fireEvent.click(element);
  expect(pushMock).toHaveBeenCalledWith(`/${useSearchParams}/billboards/new`);
});

test("should MainNav ", () => {
  render(<MainNav />);
  const element = screen.getByText("Billboards");
  expect(element).toBeInTheDocument();
});
