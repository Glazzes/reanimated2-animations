import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

type HeaderProps = {
  title: string;
  subtitle: string;
  tooltip: string;
  tooltipColor: string;
};

const PADDING = 10;

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  tooltipColor,
  tooltip,
}) => {
  const style = {backgroundColor: tooltipColor};

  return (
    <View>
      <View style={[styles.infoContainer, {paddingBottom: PADDING / 2}]}>
        <Text style={styles.title}>{title}</Text>
        <Entypo name={'dots-three-horizontal'} color={'white'} size={20} />
      </View>
      <View style={styles.tooltipContainer}>
        <View style={[styles.tooltip, style]}>
          <Text style={styles.tooptipText}>{tooltip}</Text>
        </View>
        <Text style={styles.more}>{subtitle}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'row',
    paddingHorizontal: PADDING * 1.8,
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  title: {
    color: 'white',
    fontSize: 25,
    fontFamily: 'SF-Pro-Text-Bold',
  },
  tooltipContainer: {
    flexDirection: 'row',
    paddingHorizontal: PADDING * 1.8,
    alignItems: 'center',
  },
  tooltip: {
    paddingVertical: PADDING / 2,
    paddingHorizontal: PADDING,
    borderRadius: PADDING * 2,
  },
  tooptipText: {
    color: 'white',
    fontFamily: 'SF-Pro-Text-Bold',
    fontSize: 12,
  },
  more: {
    color: '#497dc6',
    fontFamily: 'SF-Pro-Text-Bold',
    fontWeight: '700',
    marginLeft: PADDING / 2,
  },
});
