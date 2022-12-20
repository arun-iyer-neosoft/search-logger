import { Button } from "./Button";
import "@testing-library/jest-dom";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("Button", () => {
	it("should have blue background with bg-blue-700 class", () => {
		const wrapper = shallow(<Button>Test</Button>);

		expect(wrapper.find("button").hasClass("bg-blue-700")).toBe(true);
	});

	it("should have gray background with bg-gray-200 class", () => {
		const wrapper = shallow(<Button color='gray'>Test</Button>);

		expect(wrapper.hasClass("bg-gray-200"));
	});

	it("should match snapshot on hover", () => {
		const wrapper = shallow(<Button>Test</Button>);

		wrapper.simulate("ommouseenter");
		expect(wrapper).toMatchSnapshot();

		wrapper.simulate("onmouseleave");
		expect(wrapper).toMatchSnapshot();
	});

	it("should have type button", () => {
		const wrapper = shallow(<Button>Test</Button>);

		expect(wrapper.find("button").props().type).toBe("button");
	});

	it("should have type submit", () => {
		const wrapper = shallow(<Button type='submit'>Test</Button>);

		expect(wrapper.find("button").props().type).toBe("submit");
	});
});
