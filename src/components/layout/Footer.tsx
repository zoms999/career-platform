export function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-400 py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h3 className="text-white text-lg font-bold">한국진로적성센터</h3>
          <p className="text-sm leading-relaxed">
            빅데이터 분석 기반의 과학적인 진로 적성 검사로<br />
            여러분의 잠재력을 발견하고 미래를 설계합니다.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">서비스</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">진로적성검사</a></li>
            <li><a href="#" className="hover:text-white transition-colors">기업/단체 검사</a></li>
            <li><a href="#" className="hover:text-white transition-colors">상담 및 코칭</a></li>
            <li><a href="#" className="hover:text-white transition-colors">자격증 과정</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">고객지원</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">공지사항</a></li>
            <li><a href="#" className="hover:text-white transition-colors">자주 묻는 질문</a></li>
            <li><a href="#" className="hover:text-white transition-colors">이용약관</a></li>
            <li><a href="#" className="hover:text-white transition-colors">개인정보처리방침</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">연락처</h4>
          <ul className="space-y-2 text-sm">
            <li>Tel: 02-1234-5678</li>
            <li>Fax: 02-1234-5679</li>
            <li>Email: help@career-center.kr</li>
            <li className="pt-2">서울시 강남구 테헤란로 123</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 pt-8 border-t border-white/10 text-xs text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© 2024 Korea Career Aptitude Center. All rights reserved.</p>
        <div className="flex gap-4">
           {/* Social Icons could go here */}
        </div>
      </div>
    </footer>
  );
}
