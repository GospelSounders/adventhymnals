const accountActivation = `<div>
<div style="display:block;padding:0 32px;margin:auto">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" align="center"
        style="width:100%;max-width:520px;margin:32px auto">
        <thead>
            <tr>
                <th
                    style="text-align:center;border-top:1px solid #cccccc;border-bottom:1px solid #cccccc;font-size:22px;line-height:1.4;font-family:Helvetica,Arial,Verdana,'sans-serif','Malgun Gothic','NanumGothic';color:#000;letter-spacing:-1px;padding:11px 0 9px 0;word-wrap:break-word;word-break:normal">
                    {{system}} Account
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td
                    style="padding:36px 0 32px 0;vertical-align:top;font-size:15px;line-height:18px;color:#666666;font-weight:normal;font-family:Helvetica,Arial,Verdana,'sans-serif','Malgun Gothic','NanumGothic';word-wrap:break-word;word-break:normal">
                    <span class="im">
                        <p
                            style="font-weight:bold;font-size:20px;line-height:24px;color:#000000;font-family:Helvetica,Arial,Verdana,'sans-serif','Malgun Gothic','NanumGothic';margin:0 0 32px 0;padding:0">
                            Welcome to {{system}} services.
                        </p>
                        <p
                            style="font-size:15px;line-height:18px;color:#666666;font-weight:normal;font-family:Helvetica,Arial,Verdana,'sans-serif','Malgun Gothic','NanumGothic';padding:0;margin:0 0 18px 0;word-wrap:break-word;word-break:normal">
                            Dear Customer,
                        </p>
                    </span>
                    <p
                        style="font-size:15px;line-height:18px;color:#666666;font-weight:normal;font-family:Helvetica,Arial,Verdana,'sans-serif','Malgun Gothic','NanumGothic';padding:0;margin:0;word-wrap:break-word;word-break:normal">
                        <br>
                        You activation code is: <span class="il"><strong>{{token}}</strong></span>.
                    </p>
                    <!-- <br><p
                        style="font-size:15px;line-height:18px;color:#666666;font-weight:normal;font-family:Helvetica,Arial,Verdana,'sans-serif','Malgun Gothic','NanumGothic';padding:0;margin:0;word-wrap:break-word;word-break:normal;font-size:14px;line-height:16px;margin:0 0 11px 0">
                        <a id="m_1023447215255591981wipGoBackBtn"
                            href="{{api}}/api/user/activate?activateToken={{token}}"
                            style="color:#ffffff;text-decoration:none" target="_blank"
                            data-saferedirecturl="{{api}}/user/activate?activateToken={{token}}"><b
                                style="border:1px solid #1428a0;border-radius:5px;background:#1428a0;color:#ffffff;padding:11px 29px 11px 29px;display:inline-block;font-weight:normal;text-transform:uppercase">Activate</b></a>
                    </p> -->
                    <p
                        style="font-size:15px;line-height:18px;color:#666666;font-weight:normal;font-family:Helvetica,Arial,Verdana,'sans-serif','Malgun Gothic','NanumGothic';padding:0;margin:0;word-wrap:break-word;word-break:normal">
                        <br>
                        <br>
                        <br>
                        <i style="color:#000000">{{system}} Account team</i>
                    </p>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td
                    style="padding:12px 20px 14px 20px;font-size:11px;line-height:16px;font-weight:normal;font-family:Helvetica,Arial,Verdana,'sans-serif','Malgun Gothic','NanumGothic';color:#666666;background:#efefef;word-wrap:break-word;word-break:normal">

                    Note: Do not reply to this email. Contact us with any queries by visiting our website at:<br>
                    <a href="{{site}}" style="color:#1428a0;text-decoration:underline" target="_blank"
                        data-saferedirecturl="{{site}}">Go to {{system}} Account customer center</a>

                </td>
            </tr>
            <tr>
                <td
                    style="padding:20px 0 20px 0;text-align:center;font-size:11px;line-height:1;font-family:Helvetica,Arial,Verdana,'sans-serif','Malgun Gothic','NanumGothic';color:#acacac;vertical-align:middle;word-wrap:break-word;word-break:normal">

                    <img src="{{logo_url}}" border="0" alt="" style="vertical-align:middle;margin:0 12px" width="62"
                        class="CToWUd"> Copyright @{{copyright_name}}. All rights reserved.

                </td>
            </tr>
        </tfoot>
    </table>
    <div class="yj6qo"></div>
    <div class="adL">
    </div>
</div>
<div class="adL">


</div>
</div>`

module.exports = accountActivation