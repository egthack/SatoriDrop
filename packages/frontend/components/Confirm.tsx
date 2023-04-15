import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Requirement } from "../types/Requirement"

export default function Confirm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        入力したデータに問題がないか確認する
      </Typography>
      <div>ずらりと先ほど指定した条件が出てくる</div>
      <div>問題がなければこの下にあるボタンを押して、AirStackのAPIを叩いて、必要な情報を取得する</div>
      <button />
      <div>計算処理が終わるまでグルグルが表示される</div>
      <div>計算処理が終わったら右下の”Next”がアクティブになる</div>
    </React.Fragment>
  );
}
