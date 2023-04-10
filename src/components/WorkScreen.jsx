import "../assets/styles/workScreen.css";
import { wallpaperOne } from "../assets/images/wallpapers";
import {
  TaskBar,
  Desktop,
  DesktopContextMenu,
  MenuStart,
  Personalize,
} from "./";

import { useState } from "react";

import { CSSTransition } from "react-transition-group";

import Calendar from "react-calendar";
import "../assets/styles/myCalendar.css";

const WorkScreen = ({
  lang,
  user,
  changeStage,
  toDoApp,
  handleStateToDoApp,
  webBrowser,
  handleStateWebBrowser,
  closeAllPrograms,
}) => {
  // useState hook and handler function for changing Desktop wallpaper
  const [wallpaper, setWallpaper] = useState(wallpaperOne);
  const handleWallpaperChange = (image) => {
    setWallpaper(image);
  };

  // useState hook for showing and hidding MenuStart
  const [showMenuStart, setShowMenuStart] = useState(false);
  const handleShowMenuStart = () => {
    setShowMenuStart((oldVal) => !oldVal);
  };
  const handleCloseMenuStart = () => {
    setShowMenuStart(false);
  };

  // useState hook for showing and hidding Calendar
  const [showCalendar, setShowCalendar] = useState(false);
  const handleShowCalendar = () => {
    setShowCalendar((oldVal) => !oldVal);
  };
  const handleCloseCalendar = () => {
    setShowCalendar(false);
  };

  // useState hook needed for Calendar from Calendar lib
  const [value, onChange] = useState(new Date());

  // useState hook for setting where to display DesktopContextMenu
  const [desktopContextMenuPosition, setDesktopContextMenuPosition] =
    useState(null);

  const closeDesktopContextMenu = () => {
    setDesktopContextMenuPosition(null);
  };

  const handleDesktopContextMenu = (e, setDesktopContextMenuPosition) => {
    e.preventDefault();
    if (e.target.className !== "desktop") return;
    setDesktopContextMenuPosition({
      x: e.nativeEvent.clientX,
      y: e.nativeEvent.clientY,
    });
  };

  // useState hook for showing and hidding Personalize
  const [showPersonalize, setShowPersonalize] = useState(false);
  const handleShowPersonalize = () => {
    setShowPersonalize((oldVal) => !oldVal);
  };

  return (
    <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
      <div
        className="work-screen"
        onContextMenu={(e) =>
          handleDesktopContextMenu(e, setDesktopContextMenuPosition)
        }
        onClick={(e) => {
          closeDesktopContextMenu();
          if (
            e.target.className === "task-bar" ||
            e.target.className === "desktop"
          ) {
            handleCloseCalendar();
            handleCloseMenuStart();
          }
        }}
      >
        <Desktop
          handleStateToDoApp={handleStateToDoApp}
          handleStateWebBrowser={handleStateWebBrowser}
          toDoApp={toDoApp}
          webBrowser={webBrowser}
          wallpaper={wallpaper}
        />
        {desktopContextMenuPosition && (
          <DesktopContextMenu
            position={desktopContextMenuPosition}
            onClick={closeDesktopContextMenu}
            lang={lang}
            closeAllPrograms={closeAllPrograms}
            handleCloseCalendar={handleCloseCalendar}
            handleCloseMenuStart={handleCloseMenuStart}
            handleShowPersonalize={handleShowPersonalize}
          />
        )}

        <TaskBar
          lang={lang}
          handleShowCalendar={handleShowCalendar}
          handleShowMenuStart={handleShowMenuStart}
          toDoApp={toDoApp}
          handleStateToDoApp={handleStateToDoApp}
          webBrowser={webBrowser}
          handleStateWebBrowser={handleStateWebBrowser}
        />

        <CSSTransition
          in={showMenuStart}
          timeout={300}
          classNames="menu-start"
          unmountOnExit
        >
          <MenuStart
            handleCloseMenuStart={handleCloseMenuStart}
            lang={lang}
            user={user}
            changeStage={changeStage}
            handleStateWebBrowser={handleStateWebBrowser}
          />
        </CSSTransition>

        <CSSTransition
          in={showCalendar}
          timeout={300}
          classNames="calendar-start"
          unmountOnExit
        >
          <Calendar onChange={onChange} value={value} locale={lang.lng} />
        </CSSTransition>

        <CSSTransition
          in={showPersonalize}
          appear={true}
          timeout={500}
          classNames="fade"
          unmountOnExit
        >
          <Personalize
            lang={lang}
            wallpaper={wallpaper}
            handleWallpaperChange={handleWallpaperChange}
            handleShowPersonalize={handleShowPersonalize}
          />
        </CSSTransition>
      </div>
    </CSSTransition>
  );
};

export default WorkScreen;
