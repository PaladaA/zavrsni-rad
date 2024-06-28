import { useContextComp } from "../MyContext";
import { fetchDeleteAccount } from "../../functions/apiFunctions";
import UsersSettings from "./UsersSettings";
import AdminSettings from "./AdminSettings";
import UniversalCookie from "universal-cookie";
import SearchHistoryLeagues from "./SearchHistoryLeagues";
import SearchHistory from "./SearchHistory";


const Settings = () => {
  const { user, setUser } = useContextComp();
  const cookies = new UniversalCookie();

  const deleteAccountFun = async (email, id, logOut) => {
    try {
      await fetchDeleteAccount(email, id, logOut);
      logOut &&
        cookies.remove("token") &&
        setUser({ name: null, id: null, email: null });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id="settings">
      <h3>Profile</h3>{" "}
      <div id="settings-holder">
        <UsersSettings deleteAccountFun={deleteAccountFun} />
        {user.role == "admin" && (
          <AdminSettings deleteAccountFun={deleteAccountFun} />
        )}
        <div id="search-history">
          <h5>Leagues Click History</h5>
          <SearchHistoryLeagues />
        </div>
        <div id="search-history">
          <h5>Search History</h5>
          <SearchHistory />
        </div>
      </div>{" "}
    </div>
  );
};

export default Settings;
