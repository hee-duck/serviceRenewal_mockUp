// 샘플 HTML 코드로 미리보기 새창에서 랜더링 제대로 안되는 이슈 해결 필요
function openPreviewDialog(editorId) {
  const editor = document.getElementById(editorId);
  if (!editor) {
    alert("에디터를 찾을 수 없습니다.");
    return;
  }

  // 1️⃣ 에디터의 내용 가져오기
  let rawContent = editor.innerHTML.trim();

  // 2️⃣ escape 여부 판별
  const isEscaped = rawContent.includes("&lt;") || rawContent.includes("&gt;");

  // 3️⃣ HTML 복원 로직
  let decodedContent = rawContent;
  if (isEscaped) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = rawContent;
    decodedContent = textarea.value;
  }

  // 4️⃣ HTML 문서 구성
  const finalHtml =
    decodedContent.startsWith("<!DOCTYPE") ||
    decodedContent.startsWith("<html") ||
    decodedContent.startsWith("<body")
      ? decodedContent
      : "<!DOCTYPE html><html lang='ko'><head><meta charset='UTF-8'></head><body>" +
        decodedContent +
        "</body></html>";

  // 5️⃣ 새 창 열기
  const previewWindow = window.open("", "_blank", "width=1200,height=900,resizable=yes,scrollbars=yes");
  if (!previewWindow) {
    alert("팝업 차단이 설정되어 있습니다. 팝업 허용 후 다시 시도하세요.");
    return;
  }

  // 6️⃣ HTML 그대로 렌더링
  previewWindow.document.open();
  previewWindow.document.write(finalHtml);
  previewWindow.document.close();
}
