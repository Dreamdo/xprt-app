import variables from '../../../native-base-theme/variables/platform';

const styles = {
  navigateIcon: {
    height: 15,
    width: 15,
  },
  rowflow: {
    flexDirection: 'row',
  },
  rowText: {
    color: '#333333',
  },
  subjectBadge: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gold',
    borderRadius: 12,
    height: 20,
    margin: 3,
  },
  subjectText: {
    fontSize: 10,
    textAlign: 'justify',
  },
  // pending, accepted, declined
  accepted: {
    backgroundColor: '#15a369',
  },
  pending: {
    backgroundColor: '#eab94e',
  },
  declined: {
    backgroundColor: 'tomato',
  },
  xprtGreen: {
    backgroundColor: variables.brandGreen,
  },
  placeholderBody: {    
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  placeholderText: {
    margin: 30,
    alignItems: 'center',
  },
  placeholderHeader: {
    color: '#15a369',
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
};

module.exports = styles;
