import React, { Fragment, useContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import { Context, ContextProvider } from "./context/Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "./weblayouts/MainLayout";
import Home from "./components/WebPages/Home";
import About from "./components/WebPages/About";
import Contact from "./components/WebPages/Contact";


import GraduandsList from "./components/Scn-Components/Graduands/GraduandsList";
import GraduandsDetails from "./components/Scn-Components/EnrolDetails/Enroll";
import GraduandsPaid from "./components/Scn-Components/PaidDetials/Paid";


import GraduandTemp from "./components/Scn-Components/Graduands/GraduandTemp";
import Graduands from "./components/Scn-Components/Graduands/Graduands";
import EnrollmentByVolume from "./components/Scn-Components/Enrollment/EnrollmentByVolume";
import PublicEnrolledList from "./components/Scn-Components/EnrolledUsers/PublicEnrolledList";
import MyProfile from "./components/Scn-Components/Auth/MyProfile";






const Switcherlayout = React.lazy(() => import("./components/switcherlayout"));

//App
const App = React.lazy(() => import("./components/app"));
const Custompages = React.lazy(() => import("./components/custompages"));

//Dashboard
const Dashboard = React.lazy(() => import("./components/Dashboard/Dashboard"));
//Widgets
const Widgets = React.lazy(() => import("./components/Widgets/Widgets"));
//Components

const AllUsers = React.lazy(() =>
  import("./components/Scn-Components/Auth/AllUsers")
);


const CreateUser = React.lazy(() =>
  import("./components/Scn-Components/Auth/CreateUser")
);

const NewSchool = React.lazy(() =>
  import("./components/schools/NewSchool")
);
const SchoolList = React.lazy(() => import("./components/schools/SchoolList"));



//Components
const GraduantsUpload = React.lazy(() =>
  import("./components/Scn-WebComponents/graduantsUpload")
);

const Payments = React.lazy(() =>
  import("./components/Scn-Components/Payments/PaymentTypes")
);

const Badges = React.lazy(() => import("./components/Elements/Badges/Badges"));

const Breadcrumbs = React.lazy(() =>
  import("./components/Elements/Breadcrumbs/Breadcrumbs")
);



const Panels = React.lazy(() => import("./components/Elements/Panels/Panels"));

const Thumbnails = React.lazy(() =>
  import("./components/Elements/Thumbnails/Thumbnails")
);

//Advanced-Elements
const Mediaobject = React.lazy(() =>
  import("./components/Advanced-Elements/Mediaobject/Mediaobject")
);
const Accordions = React.lazy(() =>
  import("./components/Advanced-Elements/Accordion/Accordions")
);
const Carousels = React.lazy(() =>
  import("./components/Advanced-Elements/Carousel/Carousels")
);
const Charts = React.lazy(() =>
  import("./components/Advanced-Elements/Charts/Charts")
);
const Cryptocurrencies = React.lazy(() =>
  import("./components/Advanced-Elements/Crypto-currencies/Crypto-currencies")
);
const Footer = React.lazy(() =>
  import("./components/Advanced-Elements/Footers/Footers")
);
const Header = React.lazy(() =>
  import("./components/Advanced-Elements/Headers/Headers")
);
const Modal = React.lazy(() =>
  import("./components/Advanced-Elements/Modal/Modal")
);
const Progress = React.lazy(() =>
  import("./components/Advanced-Elements/Progress/Progress")
);
const Search = React.lazy(() =>
  import("./components/Advanced-Elements/Search/Search")
);
const Tabs = React.lazy(() =>
  import("./components/Advanced-Elements/Tabs/Tabs")
);
const UserList = React.lazy(() =>
  import("./components/Advanced-Elements/UserList/UserList")
);
const TooltipandPopover = React.lazy(() =>
  import("./components/Advanced-Elements/TooltipandPopover/TooltipandPopover")
);
//Charts
const ChartJs = React.lazy(() => import("./components/Charts/ChartJs/ChartJs"));
const PieCharts = React.lazy(() =>
  import("./components/Charts/PieCharts/PieCharts")
);
const Echarts = React.lazy(() => import("./components/Charts/Echarts/Echarts"));
const Nvd3charts = React.lazy(() =>
  import("./components/Charts/Nvd3Charts/Nvd3charts")
);
//Table
const DefaultTables = React.lazy(() =>
  import("./components/Table/DefaultTables/DefaultTables")
);
const DataTables = React.lazy(() =>
  import("./components/Table/DataTables/DataTables")
);
//Form
const FormAdvanced = React.lazy(() =>
  import("./components/Form/FormAdvanced/FormAdvanced")
);
const FormEditor = React.lazy(() =>
  import("./components/Form/FormEditor/FormEditor")
);
const FormValidation = React.lazy(() =>
  import("./components/Form/FormValidation/FormValidation")
);
const FormWizard = React.lazy(() =>
  import("./components/Form/FormWizard/FormWizard")
);
//Icons
const FontAwesome = React.lazy(() =>
  import("./components/Icons/FontAwesomes/FontAwesomes")
);
const MaterialDesignIcons = React.lazy(() =>
  import("./components/Icons/MaterialDesignIcons/MaterialDesignIcons")
);
const SimpleLineIcons = React.lazy(() =>
  import("./components/Icons/SimplelineIcons/SimplelineIcons")
);
const FeatherIcons = React.lazy(() =>
  import("./components/Icons/FeatherIcons/FeatherIcons")
);
const IonicIcons = React.lazy(() =>
  import("./components/Icons/IonicIcons/IonicIcons")
);
const FlagIcons = React.lazy(() =>
  import("./components/Icons/FlagsIcons/FlagsIcons")
);
const Pe7Icons = React.lazy(() =>
  import("./components/Icons/Pe7Icons/Pe7Icons")
);
const ThemifyIcons = React.lazy(() =>
  import("./components/Icons/ThemifyIcons/ThemifyIcons")
);
const TypiconsIcons = React.lazy(() =>
  import("./components/Icons/TypiconsIcons/TypiconsIcons")
);
const WeatherIcons = React.lazy(() =>
  import("./components/Icons/WeatherIcons/WeatherIcons")
);
//pages
const Profile = React.lazy(() => import("./components/pages/Profile/Profile"));

const EditProfile = React.lazy(() =>
  import("./components/pages/EditProfile/EditProfile")
);
const MailInbox = React.lazy(() =>
  import("./components/pages/MailInbox/MailInbox")
);
const MailCompose = React.lazy(() =>
  import("./components/pages/MailCompose/MailCompose")
);
const Gallery = React.lazy(() => import("./components/pages/Gallery/Gallery"));
const AboutCompany = React.lazy(() =>
  import("./components/pages/AboutCompany/AboutCompany")
);
const Services = React.lazy(() =>
  import("./components/pages/Services/Services")
);
const FAQS = React.lazy(() => import("./components/pages/FAQS/FAQS"));
const Terms = React.lazy(() => import("./components/pages/Terms/Terms"));
const Invoice = React.lazy(() => import("./components/pages/Invoice/Invoice"));
const PricingTables = React.lazy(() =>
  import("./components/pages/PricingTables/PricingTables")
);
const Empty = React.lazy(() => import("./components/pages/Empty/Empty"));
const UnderConstruction = React.lazy(() =>
  import("./components/pages/UnderConstruction/UnderConstruction")
);
//Blog
const Blog = React.lazy(() => import("./components/pages/Blog/Blog/Blog"));
const BlogDetails = React.lazy(() =>
  import("./components/pages/Blog/BlogDetails/BlogDetails")
);
const BlogPost = React.lazy(() =>
  import("./components/pages/Blog/BlogPost/BlogPost")
);
//Maps
const LeafletMaps = React.lazy(() =>
  import("./components/Maps/LeafletMaps/LeafletMaps")
);
const VectorMaps = React.lazy(() =>
  import("./components/Maps/VectorMaps/VectorMaps")
);
//E-Commerce
const Shop = React.lazy(() =>
  import("./components/pages/E-Commerce/Shop/Shop")
);
const Checkout = React.lazy(() =>
  import("./components/pages/E-Commerce/Checkout/Checkout")
);
const ProductDetails = React.lazy(() =>
  import("./components/pages/E-Commerce/ProductDetails/ProductDetails")
);
const ShoppingCarts = React.lazy(() =>
  import("./components/pages/E-Commerce/ShoppingCarts/ShoppingCarts")
);
const Wishlist = React.lazy(() =>
  import("./components/pages/E-Commerce/Wishlist/Wishlist")
);
//FileManger
const FileManager = React.lazy(() =>
  import("./components/pages/FileManager/FileManager/FileManager")
);
const FileAttachments = React.lazy(() =>
  import("./components/pages/FileManager/FileAttachments/FileAttachments")
);
const FileDetails = React.lazy(() =>
  import("./components/pages/FileManager/FileDetails/FileDetails")
);
const FileManagerList = React.lazy(() =>
  import("./components/pages/FileManager/FileManagerList/FileManagerList")
);

//custom Pages
const Login = React.lazy(() => import("./components/WebPages/Auth/Login"));
const Register = React.lazy(() =>
  import("./components/WebPages/Auth/Register")
);
const ForgotPassword = React.lazy(() =>
  import("./components/Scn-Components/ForgotPassword/ForgotPassword")
);
const ForgotRequest = React.lazy(() =>
  import("./components/Scn-Components/ForgotPassword/ForgotRequest")
);
const PasswordReset = React.lazy(() =>
  import("./components/Scn-Components/ForgotPassword/PasswordReset")
);
const CreateAmount = React.lazy(() =>
  import("./components/Scn-Components/PaymentAmount/CreateAmount")
);
const CreateModule = React.lazy(() =>
  import("./components/Scn-Components/Module/CreateModule")
);
const CreateTitle = React.lazy(() =>
  import("./components/Scn-Components/Title/CreateTitle")
);


const GetChangeOfName = React.lazy(() =>
  import("./components/Scn-Components/ChangeOfName/GetChangeOfName")
);

const GetSingleEnrollment = React.lazy(() =>
  import("./components/Scn-Components/Enrollment/SingleEnrolledUser")
);
const GetSingleEnrolledUser = React.lazy(() =>
  import("./components/Scn-Components/EnrolledUsers/EnrolledUserReport")
);
const SendSingleEnrolledUser = React.lazy(() =>
  import("./components/Scn-Components/EnrolledUsers/SendEnrolledUserReport")
);
const EditEnrollment = React.lazy(() =>
  import("./components/Scn-Components/Enrollment/EditEnrolledUser")
);

const SinglePersonalTemList = React.lazy(() =>
  import("./components/Scn-Components/TemEnroll/SingleTemp")
);
const EnrolledUserList = React.lazy(() =>
  import("./components/Scn-Components/EnrolledUsers/EnrolledUserList")
);

const CreateRole = React.lazy(() =>
  import("./components/Scn-Components/Module/CreateRole")
);
const AssignUserToRole = React.lazy(() =>
  import("./components/Scn-Components/Module/AssignUserToRole")
);
const AssignModuleToRole = React.lazy(() =>
  import("./components/Scn-Components/Module/AssignModuleToRole")
);
const CreateSubmodule = React.lazy(() =>
  import("./components/Scn-Components/Module/CreateSubmodule")
);
const LockScreen = React.lazy(() =>
  import("./components/CustomPages/LockScreen/LockScreen")
);



//Errorpages
const Errorpage400 = React.lazy(() =>
  import("./components/ErrorPages/ErrorPages/400/400")
);
const Errorpage401 = React.lazy(() =>
  import("./components/ErrorPages/ErrorPages/401/401")
);
const Errorpage403 = React.lazy(() =>
  import("./components/ErrorPages/ErrorPages/403/403")
);
const Errorpage500 = React.lazy(() =>
  import("./components/ErrorPages/ErrorPages/500/500")
);
const Errorpage503 = React.lazy(() =>
  import("./components/ErrorPages/ErrorPages/503/503")
);

const Private = ({ children }) => {
  return children;
};

const Loaderimg = () => {
  return (
    <div id="global-loader">
      <img
        src={require("./assets/images/loader.svg").default}
        className="loader-img"
        alt="Loader"
      />
    </div>
  );
};

const Root = () => {
  const { user } = useContext(Context);
  console.log("user", user)

  return (
    <Fragment>
      <ContextProvider>
        <BrowserRouter>
          <React.Suspense fallback={Loaderimg()}>
            {/* <AuthProvider> */}
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />

            <Routes>
              <Route element={<MainLayout />}>
                <Route
                  path="/login"
                  element={
                    user ? (
                      <Navigate to={`${process.env.PUBLIC_URL}/`} />
                    ) : (
                      <Login />
                    )
                  }
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/register`}
                  element={<Register />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/home`}
                  element={
                    user ? (
                      <Navigate to={`${process.env.PUBLIC_URL}/`} />
                    ) : (
                      <Home />
                    )
                  }
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/about`}
                  element={
                    user ? (
                      <Navigate to={`${process.env.PUBLIC_URL}/`} />
                    ) : (
                      <About />
                    )
                  }
                />

                <Route
                  path={`${process.env.PUBLIC_URL}/contact`}
                  element={
                    user ? (
                      <Navigate to={`${process.env.PUBLIC_URL}/`} />
                    ) : (
                      <Contact />
                    )
                  }
                />
              </Route>

              <Route
                path={`${process.env.PUBLIC_URL}/`}
                element={
                  user ? (
                    <App />
                  ) : (
                    <Navigate to={`${process.env.PUBLIC_URL}/home`} />
                  )
                }>
                <Route
                  index
                  element={<Dashboard />}
                />

                <Route
                  path={`${process.env.PUBLIC_URL}/dashboard`}
                  element={<Dashboard />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/widgets`}
                  element={<Widgets />}
                />

                <Route>
                  {/* supreme court route links */}
                  <Route
                    path={`${process.env.PUBLIC_URL}/assign-module-to-role`}
                    element={<AssignModuleToRole />}
                  />
               
                  <Route
                    path={`${process.env.PUBLIC_URL}/submodule-list`}
                    element={<CreateSubmodule />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/payments`}
                    element={<Payments />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/role`}
                    element={<CreateRole />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/users-and-role`}
                    element={<AssignUserToRole />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/users`}
                    element={<AllUsers />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/create-user`}
                    element={<CreateUser />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/new-school`}
                    element={<NewSchool />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/school-list`}
                    element={<SchoolList />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/module-list`}
                    element={<CreateModule />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/amount-list`}
                    element={<CreateAmount />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/title-list`}
                    element={<CreateTitle />}
                  />
                
               
                  <Route
                    path={`${process.env.PUBLIC_URL}/change-of-details-list/:id`}
                    element={<SinglePersonalTemList />}
                  />
                 
                  <Route
                    path={`${process.env.PUBLIC_URL}/change-of-details-list/:id`}
                    element={<SinglePersonalTemList />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/enrolled-users/list`}
                    element={<EnrolledUserList />}
                  />
                
                  <Route
                    path={`${process.env.PUBLIC_URL}/enrolled-user/:id`}
                    element={<GetSingleEnrollment />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/send-enrolled-user/:id`}
                    element={<SendSingleEnrolledUser />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/enrollment-status/:id`}
                    element={<GetSingleEnrolledUser />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/enrollment-by-volume`}
                    element={<EnrollmentByVolume />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/all-enrolled-pub-lawyers`}
                    element={<PublicEnrolledList />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/enrolled-user/edit/:id`}
                    element={<EditEnrollment />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/graduants-upload`}
                    element={<GraduantsUpload />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/graduands-list`}
                    element={<GraduandsList />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/graduands-details`}
                    element={<GraduandsDetails />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/paid-graduands`}
                    element={<GraduandsPaid />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/graduands-lists`}
                    element={<Graduands />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/graduand-temp`}
                    element={<GraduandTemp />}
                  />
               
                  <Route
                    path={`${process.env.PUBLIC_URL}/change-of-name-request`}
                    element={<GetChangeOfName />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/my-profile`}
                    element={<MyProfile />}
                  />
                </Route>
                <Route>
                  <Route
                    path={`${process.env.PUBLIC_URL}/elements/breadcrumbs`}
                    element={<Breadcrumbs />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/elements/badges`}
                    element={<Badges />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/elements/panels`}
                    element={<Panels />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/elements/thumbnails`}
                    element={<Thumbnails />}
                  />
                </Route>
                <Route>
                  <Route
                    path={`${process.env.PUBLIC_URL}/advancedElements/mediaObject`}
                    element={<Mediaobject />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/advancedElements/accordions`}
                    element={<Accordions />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/advancedElements/tabs`}
                    element={<Tabs />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/advancedElements/charts`}
                    element={<Charts />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/advancedElements/modal`}
                    element={<Modal />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/advancedElements/tooltipandPopover`}
                    element={<TooltipandPopover />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/advancedElements/progress`}
                    element={<Progress />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/advancedElements/carousels`}
                    element={<Carousels />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/advancedElements/headers`}
                    element={<Header />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/advancedElements/footers`}
                    element={<Footer />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/advancedElements/userList`}
                    element={<UserList />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/advancedElements/search`}
                    element={<Search />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/advancedElements/cryptoCurrencies`}
                    element={<Cryptocurrencies />}
                  />
                </Route>
                <Route>
                  <Route
                    path={`${process.env.PUBLIC_URL}/charts/chartJs`}
                    element={<ChartJs />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/charts/echarts`}
                    element={<Echarts />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/charts/nvd3charts`}
                    element={<Nvd3charts />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/charts/PieCharts`}
                    element={<PieCharts />}
                  />
                </Route>
                <Route>
                  <Route
                    path={`${process.env.PUBLIC_URL}/tables/defaultTables`}
                    element={<DefaultTables />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/tables/dataTables`}
                    element={<DataTables />}
                  />
                </Route>

                <Route>
                  <Route
                    path={`${process.env.PUBLIC_URL}/form/formAdvanced`}
                    element={<FormAdvanced />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/form/formEditor`}
                    element={<Private Component={FormEditor} />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/form/formWizard`}
                    element={<FormWizard />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/form/formValidation`}
                    element={<FormValidation />}
                  />
                </Route>
                <Route>
                  <Route
                    path={`${process.env.PUBLIC_URL}/icon/fontAwesome`}
                    element={<FontAwesome />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/icon/materialDesignIcons`}
                    element={<MaterialDesignIcons />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/icon/simpleLineIcons`}
                    element={<SimpleLineIcons />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/icon/featherIcons`}
                    element={<FeatherIcons />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/icon/ionicIcons`}
                    element={<IonicIcons />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/icon/flagIcons`}
                    element={<FlagIcons />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/icon/pe7Icons`}
                    element={<Private Component={Pe7Icons} />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/icon/themifyIcons`}
                    element={<ThemifyIcons />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/icon/typiconsIcons`}
                    element={<TypiconsIcons />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/icon/weatherIcons`}
                    element={<WeatherIcons />}
                  />
                </Route>
                <Route>
                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/profile`}
                    element={<Profile />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/editProfile`}
                    element={<EditProfile />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/mailInbox`}
                    element={<Private Component={MailInbox} />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/mailCompose`}
                    element={<Private Component={MailCompose} />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/gallery`}
                    element={<Private Component={Gallery} />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/aboutCompany`}
                    element={<AboutCompany />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/services`}
                    element={<Services />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/faqs`}
                    element={<FAQS />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/terms`}
                    element={<Terms />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/invoice`}
                    element={<Invoice />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/pricingTables`}
                    element={<PricingTables />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/Blog/blog`}
                    element={<Blog />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/Blog/blogDetails`}
                    element={<BlogDetails />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/Blog/blogPost`}
                    element={<BlogPost />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/empty`}
                    element={<Empty />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/maps/leafletMaps`}
                    element={<Private Component={LeafletMaps} />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/maps/vectorMaps`}
                    element={<Private Component={VectorMaps} />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/e-commerce/shop`}
                    element={<Shop />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/e-commerce/productDetails`}
                    element={<ProductDetails />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/e-commerce/shoppingCart`}
                    element={<ShoppingCarts />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/e-commerce/wishlist`}
                    element={<Wishlist />}
                  />

                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/e-commerce/checkout`}
                    element={<Private Component={Checkout} />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/FileManager/FileAttachments/FileAttachments`}
                    element={<Private Component={FileAttachments} />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/FileManager/FileDetails/FileDetails`}
                    element={<Private Component={FileDetails} />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/FileManagerFileManager/FileManager`}
                    element={<FileManager />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/pages/FileManager/FileManagerList/FileManagerList`}
                    element={<FileManagerList />}
                  />
                </Route>
              </Route>
              <Route
                path={`${process.env.PUBLIC_URL}/pages/themeStyle`}
                element={<Switcherlayout />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/`}
                element={<Custompages />}>
                <Route
                  path={`${process.env.PUBLIC_URL}/pages/underConstruction`}
                  element={<UnderConstruction />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/login`}
                  element={<Login />}
                />

                <Route
                  path={`${process.env.PUBLIC_URL}/forgotPassword`}
                  element={<ForgotPassword />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/forgot-password-request-success`}
                  element={<ForgotRequest />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/reset-password/:id`}
                  element={<PasswordReset />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/custompages/lockScreen`}
                  element={<LockScreen />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/custompages/errorpages/errorpage401`}
                  element={<Errorpage401 />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/custompages/errorpages/errorpage403`}
                  element={<Errorpage403 />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/custompages/errorpages/errorpage500`}
                  element={<Errorpage500 />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/custompages/errorpages/errorpage503`}
                  element={<Errorpage503 />}
                />
                <Route
                  path="*"
                  element={<Errorpage400 />}
                />
              </Route>
            </Routes>

            {/* </AuthProvider>  */}
          </React.Suspense>
        </BrowserRouter>
      </ContextProvider>
    </Fragment>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);
