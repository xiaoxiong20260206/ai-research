/* ───────────────────────────────
   PAGE: 通知中心
─────────────────────────────── */
function NotifPage(){
  const [items,setItems]=useState(NOTIFS);
  const [filterType,setFilterType]=useState('all');
  const filtered=filterType==='all'?items:items.filter(n=>n.type===filterType);
  const bdg={hil:'orange',done:'green',alert:'amber',suggest:'blue'};

  return(
    <div className="page-in" style={{maxWidth:700}}>
      <div style={{display:'flex',gap:6,marginBottom:16}}>
        {['all','hil','done','alert','suggest'].map(f=>(
          <button key={f} className={`btn btn-sm ${filterType===f?'btn-blue':'btn-outline'}`} onClick={()=>setFilterType(f)}>
            {f==='all'?'全部':f==='hil'?'⏸ HIL':f==='done'?'✅ 完成':f==='alert'?'🔔 告警':'💡 建议'}
          </button>
        ))}
        <div style={{marginLeft:'auto'}}>
          <button className="btn btn-ghost btn-sm" onClick={()=>setItems(p=>p.map(n=>({...n,unread:false})))}>全部已读</button>
        </div>
      </div>

      <div className="card" style={{padding:0}}>
        {filtered.map((n,i)=>(
          <div key={n.id} className="notif-item" style={{padding:'14px 18px',background:n.unread?'var(--surface-2)':'transparent'}}>
            <div className="notif-dot-wrap">
              <div className={`dot dot-${n.badge==='hil'?'hil':n.badge==='green'?'done':n.badge==='amber'?'hil':'running'}`}/>
              {i<filtered.length-1&&<div className="notif-line"/>}
            </div>
            <div style={{flex:1}}>
              <div style={{display:'flex',alignItems:'center',gap:7,marginBottom:3}}>
                <span style={{fontWeight:n.unread?600:500,fontSize:13.5}}>{n.title}</span>
                {n.unread&&<div style={{width:7,height:7,borderRadius:'50%',background:'var(--blue)',flexShrink:0}}/>}
              </div>
              <div style={{fontSize:12.5,color:'var(--text-2)',lineHeight:1.55,marginBottom:5}}>{n.body}</div>
              <div style={{display:'flex',gap:8,alignItems:'center'}}>
                <span style={{fontSize:11,color:'var(--text-3)'}}>{n.time}</span>
                {n.type==='hil'&&(
                  <div style={{display:'flex',gap:5}}>
                    <button className="btn btn-blue btn-sm" style={{padding:'3px 8px',fontSize:11}}>✓ 确认</button>
                    <button className="btn btn-danger btn-sm" style={{padding:'3px 8px',fontSize:11}}>拒绝</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
