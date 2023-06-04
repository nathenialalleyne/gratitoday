import React, { useEffect, useState } from "react";
import classNames from "classnames";

type Props = {
  showing: boolean;
  children: React.ReactNode;
  backgroundClasses?: string;
};

export default function Modal({ showing, children, backgroundClasses }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log("test");
    setIsOpen(showing);
  }, [showing]);

  return isOpen ? (
    <div className={classNames(styles.background, backgroundClasses)}>
      <button className={styles.close} onClick={() => setIsOpen(false)}>
        close
      </button>
      {children}
    </div>
  ) : null;
}

const styles = {
  background: "absolute z-10 w-full h-full bg-gray-900 bg-opacity-50",
  close: "absolute top-0 right-0 text-red-300 bg-red-100",
};
