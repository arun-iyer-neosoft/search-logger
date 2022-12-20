import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Home from "../pages/index";

configure({ adapter: new Adapter() });

jest.mock("next/router", () => ({
	useRouter() {
		return {
			route: "/",
			pathname: "",
			query: "",
			asPath: "",
			push: jest.fn(),
			events: {
				on: jest.fn(),
				off: jest.fn(),
			},
			beforePopState: jest.fn(() => null),
			prefetch: jest.fn(() => null),
		};
	},
}));

describe("Home", () => {
	it("should render home unchanged", () => {
		const useRouter = jest.spyOn(require("next/router"), "useRouter");

		useRouter.mockImplementation(() => ({
			route: "/",
			pathname: "",
			query: "",
			asPath: "",
			push: jest.fn(),
			events: {
				on: jest.fn(),
				off: jest.fn(),
			},
			beforePopState: jest.fn(() => null),
			prefetch: jest.fn(() => null),
		}));
		const wrapper = shallow(
			<Home
				data={{
					elapsed: 50,
					success: true,
					result: {
						auditLog: [],
					},
				}}
			/>
		);
		expect(wrapper).toMatchSnapshot();
	});
});
