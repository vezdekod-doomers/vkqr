import React, {useEffect, useState} from 'react';
import {CellButton, Panel, PanelHeader} from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";

interface Props {
  onMain: () => void;
}

function makeid(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

const QrPanel: React.FunctionComponent<Props> = ({onMain}) => {
  const [result, setResult] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);
  useEffect(() => {
    bridge.send('VKWebAppOpenCodeReader')
      .then(value => {
        setResult(value.code_data);
        return bridge.send('VKWebAppStorageSet', {key: 'qr_' + makeid(8), value: value.code_data})
      })
      .catch((reason) => setError(JSON.stringify(reason)))
  }, []);
  return (
    <Panel>
      <PanelHeader>Результат сканирования</PanelHeader>
      <div className={'main'}>
        {error ? <h3>Ошибка: {error}</h3> : <h3>Результат: {result}</h3>}
        <CellButton onClick={onMain}>На главную</CellButton>
      </div>
    </Panel>
  );
};

export default QrPanel;
