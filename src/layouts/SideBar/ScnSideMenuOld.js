import React, { Fragment, useContext, useState } from "react";
import { Context } from "../../context/Context.js"
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

const ScnSideMenuOld = () => {
  const { user } = useContext(Context)
  
  const menus = [
    {
      // menutitle: "MAIN",
      Items: [
        {
          path: `${process.env.PUBLIC_URL}/dashboard`,
          icon: "home",
          type: "link",
          active: true,
          title: "Dashboard",
        }
      ],
    },

    {
      // menutitle: "Elements",
      Items: [
        {
          title: "Upload Graduants Batch",
          icon: "package",
          type: "sub",
          active: false,
          children: [
            {
              path: `${process.env.PUBLIC_URL}/graduants-upload`,
              title: "Upload Graduants",
              type: "link",
            }
          ],
        },

        {
          title: "Enrollment",
          icon: "package",
          type: "sub",
          active: false,
          children: [
            {
              path: `${process.env.PUBLIC_URL}/to-enroll`,
              type: "link",
              title: "Verify Enrollment",
            },
            // {
            //   path: `${process.env.PUBLIC_URL}/pending`,
            //   type: "link",
            //   title: "Pending Enrollment",
            // },
            {
              path: `${process.env.PUBLIC_URL}/enrolled-list`,
              type: "link",
              title: "Enrollment Number",
            },
            {
              path: `${process.env.PUBLIC_URL}/enrolled-users/list`,
              type: "link",
              title: "Enrolled Users List",
            },
            
          ],
        },
        
        // {
        //   title: "Role Management",
        //   icon: "package",
        //   type: "sub",
        //   active: false,
        //   children: [
        //     {
        //       path: `${process.env.PUBLIC_URL}/role`,
        //       title: "Create Role",
        //       type: "link",
        //     },
        //     {
        //       path: `${process.env.PUBLIC_URL}/module-list`,
        //       title: "Create Module",
        //       type: "link",
        //     },
        //     {
        //       path: `${process.env.PUBLIC_URL}/submodule-list`,
        //       title: "Create Submodule",
        //       type: "link",
        //     },
        //     {
        //       path: `${process.env.PUBLIC_URL}/assign-module-to-role`,
        //       title: "Assign Module to role",
        //       type: "link",
        //     },

        //   ],
        // },

        {
          title: "Setup",
          icon: "package",
          type: "sub",
          active: false,
          children: [
            {
              path: `${process.env.PUBLIC_URL}/title-list`,
              type: "link",
              title: "Title Setup",
            },
            {
              path: `${process.env.PUBLIC_URL}/chief-registrars`,
              type: "link",
              title: "Chief Registrars",
            },
            {
              path: `${process.env.PUBLIC_URL}/create-chief-registrar`,
              type: "link",
              title: "Create Chief Registrar",
            },
            
            
          ],
        },

        // {
        //   title: "Confirm Enrollment",
        //   icon: "package",
        //   type: "sub",
        //   active: false,
        //   children: [
        //     {
        //       path: `${process.env.PUBLIC_URL}/to-enroll`,
        //       title: "Enroll",
        //       type: "link",
        //     }
        //   ],
        // },

      ]
    }
  ]
  const [mainmenu, setMainMenu] = useState([]);
  const [mainn, setMainn] = useState([]);
  useEffect(() => {
    setMainMenu(menus);
    setMainn(menus);
  }, [])

  const setNavActive = (item) => {

    mainn?.map((menuItems) => {
      menuItems.Items.filter((Items) => {
        if (Items !== item) {
          Items.active = false;
        }
        
        if (Items.children && Items.children.includes(item)) {
          Items.active = true;
        }
        if (Items.children) {
          Items.children.filter((submenuItems) => {
            if (submenuItems.children && submenuItems.children.includes(item)) {
              Items.active = true;
              submenuItems.active = true;
              return true;
            } else {
              return false;
            }
          });
        }
        return Items;
      });
      return menuItems;
    });
    item.active = !item.active;
    setMainMenu({mainmenu:mainn});
  };

  const toggletNavActive = (item) => {
    let mainn=mainmenu;
    // console.log(mainn);
    if (window.innerWidth <= 991) {
      if (item.type === "sub") {

      }
    }
    if (!item.active) {
      
      mainn.map((a) => {
          a.Items.filter((Items) => {
            if (a.Items.includes(item)) Items.active = false;
            if (!Items.children) return false;
            Items.children.forEach((b) => {
              if (Items.children.includes(item)) {
                b.active = false;
              }
              if (!b.children) return false;
              b.children.forEach((c) => {
                if (b.children.includes(item)) {
                  c.active = false;
                }
              });
            });
            return Items;
          });
          return a;
        });
    }
      item.active = !item.active;
      setMainMenu({mainmenu:mainn});
  };
  
  return (
    <>
      {mainn?.map((Item, i) => (
        <Fragment key={i}>
          <li className="sub-category">
            <h3>{Item.menutitle}</h3>
          </li>
          {Item.Items.map((menuItem, i) => (
            <li
              className={`slide ${menuItem.active ? "is-expanded" : ""
                }`}
              key={i}
            >
              {menuItem.type === "link" ? (
                <NavLink
                  to={menuItem.path + "/"}
                  className={`side-menu__item ${menuItem.active ? "active" : ""
                    }`}
                  onClick={() => {
                    toggletNavActive(menuItem);
                    setNavActive(menuItem);

                  }}
                >
                  <i
                    className={`side-menu__icon fe fe-${menuItem.icon}`}
                  ></i>
                  <span className="side-menu__label">
                    {menuItem.title}
                  </span>
                  {menuItem.badge ? (
                    <label className={`${menuItem.badge} side-badge`}>
                      {menuItem.badgetxt}
                    </label>
                  ) : (
                    ""
                  )}
                </NavLink>
              ) : (
                ""
              )}

              {menuItem.type === "sub" ? (

                <NavLink
                  to={menuItem.path + "/"}
                  className={`side-menu__item ${menuItem.active ? "active" : ""
                    }`}
                  onClick={(event) => {


                    event.preventDefault();
                    setNavActive(menuItem);
                  }}
                >
                  <i
                    className={`side-menu__icon fe fe-${menuItem.icon}`}
                  ></i>
                  <span className="side-menu__label">
                    {menuItem.title}
                  </span>
                  {menuItem.badge ? (
                    <label className={`${menuItem.badge} side-badge`}>
                      {menuItem.badgetxt}
                    </label>
                  ) : (
                    ""
                  )}
                  <i
                    className={`${menuItem.background} fa angle fa-angle-right `}
                  ></i>
                </NavLink>
              ) : (
                ""
              )}
              {menuItem.children ? (
                <ul
                  className="slide-menu"
                  style={
                    menuItem.active
                      ? {
                        opacity: 1,
                        transition: "opacity 500ms ease-in",
                        display: "block",
                      }
                      : { display: "none" }
                  }
                >
                  {menuItem.children.map((childrenItem, index) => {
                    return (
                      <li key={index}>
                        {childrenItem.type === "sub" ? (
                          <a
                            href="javascript"
                            className="sub-side-menu__item"
                            onClick={(event) => {
                              event.preventDefault();

                              toggletNavActive(childrenItem);
                            }}
                          >
                            <span className="sub-side-menu__label">
                              {childrenItem.title}
                            </span>
                            {childrenItem.active ? (
                              <i className="sub-angle  fa fa-angle-down"></i>
                            ) : (
                              <i className="sub-angle fa fa-angle-right"></i>
                            )}
                          </a>
                        ) : (
                          ""
                        )}
                        {childrenItem.type === "link" ? (
                          <NavLink
                            to={childrenItem.path + "/"}
                            className="slide-item"
                            onClick={() => {

                              toggletNavActive(childrenItem)
                            }}
                          >
                            {childrenItem.title}
                          </NavLink>
                        ) : (
                          ""
                        )}
                        {childrenItem.children ? (
                          <ul
                            className="sub-slide-menu"
                            style={
                              childrenItem.active
                                ? { display: "block" }
                                : { display: "none" }
                            }
                          >
                            {childrenItem.children.map(
                              (childrenSubItem, key) => (
                                <li key={key}>
                                  {childrenSubItem.type === "link" ? (
                                    <NavLink
                                      to={childrenSubItem.path + "/"}
                                      className={`${"sub-slide-item"}`}
                                      onClick={() =>
                                        toggletNavActive(
                                          childrenSubItem
                                        )
                                      }
                                    >
                                      {childrenSubItem.title}
                                    </NavLink>
                                  ) : (
                                    ""
                                  )}
                                </li>
                              )
                            )}
                          </ul>
                        ) : (
                          ""
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                ""
              )}
            </li>
          ))}
        </Fragment>
      ))}
    </>
  )
}

export default ScnSideMenuOld