import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

//import './Navigator.scss';

class MenuGroup extends Component {
  // state = {
  //   isOpen: false
  // }
  // showHideLevel1 = () => {
  //   console.log('showHideLevel1');
  //   this.setState({
  //     isOpen: !this.state.isOpen
  //   });
  // };
  render() {
    const { name, children } = this.props;
    return (
      <>
        <li className="heading">
          <h3 className="uppercase"><FormattedMessage id={name} /></h3>
        </li>
        {children}
      </>
    );
  }
}

class Menu extends Component {
  state = {
    isOpen: false
  }
  showHideLevel1 = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  getItemClass = (keySetActive, link) => {
    let currentPath = this.props.location.pathname;
    //console.log(this.props.location.pathname, "===> ", keySetActive)
    if (this.props.location.pathname && keySetActive) {
      let result = currentPath.includes('/' + keySetActive);
      console.log(this.props.location.pathname, "===> ", keySetActive, " result==> ", result, " link==> ", link)
      return result ? " active open" : "";
    } else {
      return "";
    }

  };
  getItemClass2 = (keySetActive) => {
    let currentPath = this.props.location.pathname;
    if (currentPath && keySetActive) {
      let result = currentPath.includes('/' + keySetActive);
      return result ? " show" : " hide";
    } else {
      return "";
    }
  };
  render() {
    const { name, icon, active, link, keyActive, children, onClick, hasSubMenu, onLinkClick } = this.props;
    //console.log('menu================================');
    //console.log(name);
    //console.log('get path', this.props.location);
    return (
      < li className={"nav-item" + this.getItemClass(keyActive, name)} >
        {hasSubMenu ? (<><div className="nav-link nav-toggle"
          onClick={() => this.showHideLevel1(this.state.isOpen)}>
          <i className={icon}></i>
          <span className="title"><FormattedMessage id={name} /></span>
          <span className={"arrow" + this.getItemClass(keyActive) + (this.state.isOpen ? " open" : " ")}></span>
        </div ><ul className={"sub-menu" + this.getItemClass2(keyActive) + (this.state.isOpen ? " show" : " hide")}>
            {children}
          </ul></>) : (<Link to={link} className="nav-link" onClick={onLinkClick}>
            <i className={icon}></i>
            <span className="title"><FormattedMessage id={name} /></span>
          </Link >)
        }
      </li >
    );
  }
}

class SubMenu extends Component {

  getItemClass = path => {
    return this.props.location.pathname === path ? "active" : "";
  };

  render() {
    const { name, link, onLinkClick } = this.props;
    return (
      <li className={"nav-item " + this.getItemClass(link)}>
        <Link to={link} className="nav-link " onClick={onLinkClick}>
          <FormattedMessage id={name} />
        </Link>
      </li>
    );
  }
}

const MenuGroupWithRouter = withRouter(MenuGroup);
const MenuWithRouter = withRouter(Menu);
const SubMenuWithRouter = withRouter(SubMenu);

const withRouterInnerRef = (WrappedComponent) => {

  class InnerComponentWithRef extends React.Component {
    render() {
      const { forwardRef, ...rest } = this.props;
      return <WrappedComponent {...rest} ref={forwardRef} />;
    }
  }

  const ComponentWithRef = withRouter(InnerComponentWithRef, { withRef: true });

  return React.forwardRef((props, ref) => {
    return <ComponentWithRef {...props} forwardRef={ref} />;
  });
};

class Navigator extends Component {
  state = {
    expandedMenu: {}
  };

  toggle = (groupIndex, menuIndex) => {
    const expandedMenu = {};
    const needExpand = !(this.state.expandedMenu[groupIndex + '_' + menuIndex] === true);
    if (needExpand) {
      expandedMenu[groupIndex + '_' + menuIndex] = true;
    }

    this.setState({
      expandedMenu: expandedMenu
    });
  };


  isMenuHasSubMenuActive = (location, subMenus, link) => {
    if (subMenus) {
      if (subMenus.length === 0) {
        return false;
      }

      const currentPath = location.pathname;
      for (let i = 0; i < subMenus.length; i++) {
        const subMenu = subMenus[i];
        if (subMenu.link === currentPath) {
          return true;
        }
      }
    }

    if (link) {
      return this.props.location.pathname === link;
    }

    return false;
  };

  checkActiveMenu = () => {
    const { menus, location } = this.props;
    outerLoop:
    for (let i = 0; i < menus.length; i++) {
      const group = menus[i];
      //console.log('Checking active menu');
      //console.log(group.name);
      if (group.menus && group.menus.length > 0) {
        for (let j = 0; j < group.menus.length; j++) {
          const menu = group.menus[j];
          if (menu.subMenus && menu.subMenus.length > 0) {
            if (this.isMenuHasSubMenuActive(location, menu.subMenus, null)) {
              const key = i + '_' + j;
              this.setState({
                expandedMenu: {
                  [key]: true
                }
              });
              break outerLoop;
            }
          }
        }
      }
    }
  };

  componentDidMount() {
    this.checkActiveMenu();
  };

  // componentWillReceiveProps(nextProps, prevState) {
  //     const { location, setAccountMenuPath, setSettingMenuPath } = this.props;
  //     const { location: nextLocation } = nextProps;
  //     if (location !== nextLocation) {
  //         let pathname = nextLocation && nextLocation.pathname;
  //         if ((pathname.startsWith('/account/') || pathname.startsWith('/fds/account/'))) {
  //             setAccountMenuPath(pathname);
  //         }
  //         if (pathname.startsWith('/settings/')) {
  //             setSettingMenuPath(pathname);
  //         };
  //     };
  // };

  componentDidUpdate(prevProps, prevState) {
    const { location } = this.props;
    const { location: prevLocation } = prevProps;
    if (location !== prevLocation) {
      this.checkActiveMenu();
    };
  };

  render() {
    const { menus, location, onLinkClick } = this.props;
    //console.log('render menu', menus);
    return (
      <Fragment>

        {
          menus.map((group, groupIndex) => {
            return (
              <Fragment key={groupIndex}>
                <MenuGroupWithRouter
                  name={group.name}
                >
                  {group.menus ? (
                    group.menus.map((menu, menuIndex) => {
                      //console.log('render menu, menuIndex:', menu)
                      const isMenuHasSubMenuActive = this.isMenuHasSubMenuActive(location, menu.subMenus, menu.link);
                      const isSubMenuOpen = this.state.expandedMenu[groupIndex + '_' + menuIndex] === true;
                      return (
                        <MenuWithRouter
                          key={menuIndex}
                          active={isMenuHasSubMenuActive}
                          name={menu.name}
                          icon={menu.icon}
                          link={menu.link}
                          keyActive={menu.key}
                          hasSubMenu={menu.subMenus}
                          isOpen={isSubMenuOpen}
                          onClick={() => this.toggle(groupIndex, menuIndex)}
                          onLinkClick={onLinkClick}
                        >
                          {menu.subMenus && menu.subMenus.map((subMenu, subMenuIndex) => (
                            <SubMenuWithRouter
                              key={subMenuIndex}
                              name={subMenu.name}
                              link={subMenu.link}
                              onClick={this.closeOtherExpand}
                              onLinkClick={onLinkClick}
                            />
                          ))}
                        </MenuWithRouter>
                      );
                    })
                  ) : null}
                </MenuGroupWithRouter>
              </Fragment>
            );
          })
        }
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default withRouterInnerRef(connect(mapStateToProps, mapDispatchToProps)(Navigator));
