import React, { useEffect, useState } from "react";
import classNames from "classnames";

type Props = {
  showing: boolean;
  isShowing: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  backgroundClasses?: string;
  onClose?: () => void;
};

export default function Modal({ showing, isShowing, children, backgroundClasses, onClose }: Props) {
  return showing ? (
    <div className={classNames(styles.background, backgroundClasses)}>
      <button className={styles.close} onClick={() => {
        isShowing(false)
        onClose?.()
      }}>
        close
      </button>
      {children}
    </div>
  ) : null;
}

const styles = {
  background: "absolute z-10 w-screen h-screen bg-gray-900 bg-opacity-50",
  close: "absolute top-0 right-0 text-red-300 bg-red-100",
};
