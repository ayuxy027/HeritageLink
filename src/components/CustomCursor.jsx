const CustomCursor = () => {
    const cursorRef = useRef(null);
  
    useEffect(() => {
      const moveCursor = (e) => {
        const { clientX, clientY } = e;
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
        }
      };
  
      window.addEventListener('mousemove', moveCursor);
      return () => {
        window.removeEventListener('mousemove', moveCursor);
      };
    }, []);
  
    return (
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-50"
        style={{
          width: '20px',
          height: '20px',
          marginLeft: '-10px',
          marginTop: '-10px',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.5 1.5L18.5 9.5L9.5 11.5L7.5 18.5L1.5 1.5Z" stroke="white" strokeWidth="2" />
        </svg>
      </div>
    );
  };