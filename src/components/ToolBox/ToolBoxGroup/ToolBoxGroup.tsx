import { Children, ReactNode } from 'react';
import styles from './ToolBoxGroup.module.css';

interface ToolBoxGroupProps {
    title: string;
    children?: ReactNode;
    striped?: boolean;
}

const ToolBoxGroup = (props: ToolBoxGroupProps) => {
    return (
        <section>
            <header className={styles.title}>{props.title}</header>
            <div className={styles.content}>
                {props.striped
                    ? props.children &&
                      Children.toArray(props.children).map((item, index) => (
                          <div
                              key={index}
                              className={
                                  index % 2 !== 0
                                      ? styles.coloredRow
                                      : styles.row
                              }
                          >
                              {item}
                          </div>
                      ))
                    : props.children}
            </div>
        </section>
    );
};

ToolBoxGroup.defaultProps = {
    striped: false,
};

export default ToolBoxGroup;
