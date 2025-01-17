import { useLocation } from "react-router-dom";
import Modalinfo from "../components/Modal/Modalinfo";
import Backdrop from "../components/Modal/Backdrop";
import QuoteWebExtras from "../components/Quotes/QuoteExtraDetails/QuoteWebExtras";
import classes from "./QuotePage.module.css";
import Card from "../components/UI/Card";
import vclasses from "./ViewSharedQuotePage.module.css";

const ViewSharedQuotePage = ({
  setLangNum,
  setPageNum,
  setModalLangOpen,
  setModalPageOpen,
  modalLangOpen,
  modalPageOpen,
  closeModal,
}) => {
  //const [isView, setIsView] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const setQuote = () => {};
  //console.log("this is locationserach" + location.search);
  let urlObj = {};
  if (queryParams.toString() === "") {
    //setIsView(false);
    urlObj = {
      clientName: "",
      clientSurname: "",
      isWebpage: "false",
      isSeo: "false",
      isAds: "false",
      total: 0,
    };
  } else {
    // setIsView(true);
    for (const [key, value] of queryParams) {
      if (urlObj[key] === undefined) {
        urlObj[key] = value;
      }
    }
    console.log(urlObj);
  }

  let contentI = (
    <QuoteWebExtras
      setLangNum={setLangNum}
      setPageNum={setPageNum}
      langNum={Number(urlObj.langNum)}
      pageNum={Number(urlObj.pageNum)}
      setQuote={setQuote}
      modalPackage={{
        setModalLangOpen: setModalLangOpen,
        setModalPageOpen: setModalPageOpen,
        modalLangOpen: modalLangOpen,
        modalPageOpen: modalPageOpen,
      }}
    />
  );
  return (
    <div className={vclasses.vlayout}>
      <h2>View Quote</h2>
      <p>
        Type the url of the quote you want to view in the browser
        <br></br>*The data below is read only.
      </p>
      <div className={vclasses.vcontainer}>
        <Card>
          <form>
            <h3>Client Details</h3>
            <div className="spacer" className={classes.control}>
              <label htmlFor="clientName">Name</label>
              <input type="text" id="clientName" value={urlObj.clientName} />
            </div>
            <div className="spacer" className={classes.control}>
              <label htmlFor="clientSurname">Surname</label>
              <input
                type="text"
                id="clientSurname"
                value={urlObj.clientSurname}
              />
            </div>
            <h3>Quote Details</h3>
            <div className="spacer">
              <input
                type="checkbox"
                id="webpage"
                value="500"
                checked={JSON.parse(urlObj.isWebpage) ? "true" : ""}
              />
              <label htmlFor="webPage">A webpage (500 €)</label>
              <div>{JSON.parse(urlObj.isWebpage) && contentI}</div>
            </div>
            <div className="spacer">
              <input
                type="checkbox"
                id="Seo"
                name="seo"
                value="300"
                checked={JSON.parse(urlObj.isSeo) ? "true" : ""}
              />
              <label htmlFor="Seo">SEO consultation (300 €)</label>
            </div>
            <input
              type="checkbox"
              id="googleAdsCampaign"
              name="googleAdsCampaign"
              value="200"
              checked={JSON.parse(urlObj.isAds) ? "true" : ""}
            />
            <label htmlFor="googleAdsCampaign">
              Google Ads Campaign (200 €)
            </label>
            <br></br>
            <h3>
              Total Price:
              {urlObj.total}€
            </h3>
            <div>
              {modalLangOpen && (
                <Modalinfo id="languages" number={urlObj.langNum} />
              )}
              {modalPageOpen && (
                <Modalinfo id="pages" number={urlObj.pageNum} />
              )}
              {(modalLangOpen || modalPageOpen) && (
                <Backdrop onClick={closeModal} />
              )}
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ViewSharedQuotePage;
