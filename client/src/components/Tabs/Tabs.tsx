import { TSetState, TTab } from "../../types";
import { classNames } from "../../utils/classNames";

type Props = {
    setTabSelected: TSetState<TTab>;
    tabSelected: TTab;
};

type TTabConstant = {
    name: TTab;
    id: number;
};

const TABS: TTabConstant[] = [
    { name: "Freelancer", id: 0 },
    { name: "Employer", id: 1 },
];

const Tabs = ({ setTabSelected, tabSelected }: Props) => {
    // return (
    //     <div className="flex justify-center gap-2 mb-24">
    //         <button onClick={() => setTabSelected("freelancer")}>
    //             Freelancer
    //         </button>
    //         <button onClick={() => setTabSelected("employer")}>Employer</button>
    //     </div>
    // );
    return (
        <div className="mb-8">
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select a tab
                </label>
                {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full focus:ring-sky-500 focus:border-sky-500 border-gray-300 rounded-md"
                    onChange={(e) => {
                        setTabSelected((e as any).target.value);
                    }}
                    value={tabSelected}
                >
                    {TABS.map((tab) => (
                        <option key={tab.name} value={tab.name}>
                            {tab.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="hidden sm:block">
                <nav
                    className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200"
                    aria-label="Tabs"
                >
                    {TABS.map((tab, tabIdx) => (
                        <div
                            key={tab.name}
                            onClick={() => setTabSelected(tab.name)}
                            className={classNames(
                                tab.name === tabSelected
                                    ? "text-gray-900"
                                    : "text-gray-500 hover:text-gray-700",
                                tabIdx === 0 ? "rounded-l-lg" : "",
                                tabIdx === TABS.length - 1
                                    ? "rounded-r-lg"
                                    : "",
                                "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10 cursor-pointer"
                            )}
                        >
                            <span>{tab.name}</span>
                            <span
                                aria-hidden="true"
                                className={classNames(
                                    tab.name === tabSelected
                                        ? "bg-sky-500"
                                        : "bg-transparent",
                                    "absolute inset-x-0 bottom-0 h-0.5"
                                )}
                            />
                        </div>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default Tabs;
