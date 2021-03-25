import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

// 类型
type TProps = {
  time: {
    text: string;
    stamp: number;
  };
};

// 计时器
function Timer({ time }: TProps) {
  // 时钟
  const info = useRef({
    text: '',
    stamp: 0,
  });
  const [timer, setTimer] = useState({
    h: '00',
    m: '00',
    s: '00',
  });
  // 更新
  const updater = useCallback(
    (interval) => {
      const { current } = info;
      if (current.stamp-- <= 0) {
        // 清除定时器
        return clearInterval(interval);
      }
      setTimer({
        h: String((current.stamp / 3600) >> 0).padStart(2, '0'),
        m: String(((current.stamp % 3600) / 60) >> 0).padStart(2, '0'),
        s: String(current.stamp % 60 >> 0).padStart(2, '0'),
      });
    },
    [setTimer],
  );

  useEffect(() => {
    if (time.stamp > 0) {
      // 固定值
      info.current.text = time.text;
      info.current.stamp = time.stamp;
      // 定时器
      const interval = setInterval(() => {
        updater(interval);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [time]);

  return (
    <>
      {/* 场次 */}
      <Text style={styles.text}>{info.current.text}</Text>
      {/* 时分秒 */}
      <Text style={styles.item}>{timer.h}</Text>
      <Text style={styles.sepa}>:</Text>
      <Text style={styles.item}>{timer.m}</Text>
      <Text style={styles.sepa}>:</Text>
      <Text style={styles.item}>{timer.s}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#ff2727',
    marginRight: 10,
  },
  item: {
    color: '#fff',
    lineHeight: 19,
    borderRadius: 4,
    paddingLeft: 2,
    paddingRight: 2,
    backgroundColor: '#fa2c19',
  },
  sepa: {
    color: '#fa2c19',
    lineHeight: 18,
    flexDirection: 'row',
  },
});

export default Timer;
