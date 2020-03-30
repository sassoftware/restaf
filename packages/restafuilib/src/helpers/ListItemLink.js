import React from 'react';
// import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from 'react-router-dom';
class ListItemLink extends React.Component {
    renderLink = itemProps => <Link to={this.props.to} {...itemProps} />;
    ;


    render () {
      const { icon, primary, styles} = this.props;
       return (
        <li>
          <ListItem button component={this.renderLink} className={styles.list} >
            {(icon != null) ? <ListItemIcon>{icon}</ListItemIcon> : null}
            <ListItemText primary={primary}  />
          </ListItem>
        </li>
      );
    }
  }
export default ListItemLink;