const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur-xs">
      <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
